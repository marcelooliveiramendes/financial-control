
import { fastify } from '../../server.js';
import { createUser } from './../functions/users.js';



export const userRoutes = async ()  => {
    fastify.post("/create/user", async (request, reply) => {
        const { body } = request;
    
       let response = await createUser(body)
    
       if(response.code == 201){
           return reply.code(201).send({ message: 'Dado adicionado com sucesso!' });
       }
    
    })

}