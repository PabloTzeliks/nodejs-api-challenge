import fastify from 'fastify'
import crypto from 'node:crypto'

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
})

const courses = [
    { id: '1', name: 'Introduction to Programming' },
    { id: '2', name: 'Advanced JavaScript' },
    { id: '3', name: 'Database Design' }
];

server.get('/courses', () => {

    return { courses };
})

server.post('/courses', (request, reply) => {

    const courseTitle = request.body.title;
    const courseId = crypto.randomUUID();

    if (!courseTitle) {
        return reply.status(400).send({ message: 'Title is required' });
    }

    const newCourse = { id: courseId, name: courseTitle };

    courses.push(newCourse);

    return reply.status(201).send({ newCourse });
})

server.get('/courses/:id', (request, reply) => {

    const courseId = request.params.id;

    const course = courses.find(course => course.id === courseId);
    
    if (course) {
        return { course };
    }

    return reply.status(404).send({ message: 'Course not found.' });
})

server.listen({ port: 3333 }).then(() => {

    console.log('Server is running on port 3333');
})