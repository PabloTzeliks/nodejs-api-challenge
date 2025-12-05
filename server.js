const fastify = require('fastify');

const server = fastify();

const courses = [
    { id: '1', name: 'Introduction to Programming' },
    { id: '2', name: 'Advanced JavaScript' },
    { id: '3', name: 'Database Design' }
];

server.get('/courses', () => {

    return { courses };
})

server.post('/courses', (request, reply) => {

    const courseId = crypto.randomUUID();

    courses.push({ id: courseId, name: 'New Course' });

    return reply.status(201).send({ courseId });
})

server.listen({ port: 3333 }).then(() => {

    console.log('Server is running on port 3333');
})