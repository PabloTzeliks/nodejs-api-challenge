import fastify from 'fastify'
import crypto from 'node:crypto'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { eq } from 'drizzle-orm'
import { db } from './src/database/client.ts'
// import { users } from './src/database/schema.ts'
import { courses } from './src/database/schema.ts'

import { z } from 'zod'

const server = fastify({

    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// V0.2.0

server.post('/courses', {
    schema: {
        body: z.object({
            title: z.string().min(5, 'Title must have more than 5 characters'),
            description: z.string().nullish()
        })
    },
}, async (request, reply) => {

    const courseTitle = request.body.title
    const courseDescription = request.body.description

    const courseId = crypto.randomUUID()

    if (!courseTitle) {
        return reply.status(400).send({ message: 'Title is required' });
    }

    const result = await db
        .insert(courses)
        .values({ title: courseTitle, description: courseDescription ?? null })
        .returning()

    return reply.status(201).send({ courseId: result[0].id });
})

server.get('/courses', async (request, reply) => {

    const result = await db.select({
        id: courses.id,
        title: courses.title
    }).from(courses)

    return reply.send({ courses: result });
})

server.get('/courses/:id', async (request, reply) => {

    type Params = {

        id: string
    }

    const params = request.params as Params
    const courseId = params.id;

    const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))
    
    if (result.length > 0) {
        return { course: result[0] };
    }

    return reply.status(404).send({ message: 'Course not found.' });
})

server.listen({ port: 3333 }).then(() => {

    console.log('Server is running on port 3333');
})