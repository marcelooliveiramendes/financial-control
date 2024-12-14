import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './src/routes/user.js';
import { dataRoutes } from './src/routes/data.js';

export const fastify = Fastify({ logger: true });

fastify.register(cors, {
    origin: true, // Permite qualquer origem
});

fastify.register(userRoutes,{prefix: '/api'})
fastify.register(dataRoutes,{prefix: '/api'})

const start = async () => {
    try {
        await fastify.listen({ port: 3333 });
        console.log('Servidor rodando em http://localhost:3333');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
