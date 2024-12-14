import { readJsonFile, writeJsonFile } from "../functions/basic.js";
import { fastify } from "../../server.js"
import { randomInt } from 'crypto';

const filePath = 'src/database/data.json';

export const dataRoutes = async () => {
    fastify.get('/dados/:id', async (request, reply) => {
        const { id } = request.params;
        const data = readJsonFile(filePath);

        let filtered = data.filter(item => item.user == id);
        return reply.code(200).send(filtered);
    });

    // Rota para adicionar um novo dado
    fastify.post('/create-input/', async (request, reply) => {
        // const novoDado = request.body;
        const {user, date, type, description, value, prorated} = request.body
        const data = readJsonFile(filePath);        
        let id = randomInt(10, 10000000)
        

        let userInputs = []
        let teste = []
        if (!prorated.status){
            userInputs.push({
                "id": id,
                "user": user,
                "date": date,
                "type": type,
                "description": description,
                "value": value,
                "prorated": false
            })
        } else {
            let prorated_id = randomInt(10, 1000)
            let ordenedDates = getProratedDates(date, prorated.amount)
            for (let counter = 0; counter < prorated.amount; counter++) {
                userInputs.push(
                    {
                        "id": randomInt(10, 100000000),
                        "user": user,
                        "date": ordenedDates[counter],
                        "type": type,
                        "description": description,
                        "value": value,
                        "prorated": true,
                        "prorated_info": {
                            "counter": counter + 1,
                            "total": prorated.amount,
                            "prorated_id": prorated_id
                        }
                    }
                )
            }
            
        }

        userInputs.map(item => {
            data.push(item)
        })

        if(userInputs.length > 0) {
            writeJsonFile(filePath, data);
            return reply.code(201).send({ message: 'Dado adicionado com sucesso!', userInputs });
        } else {
            return reply.code(404).send({ message: 'Nenhuma informação cadastrada!' });

        }

    });

    // Rota para atualizar um dado por índice
    fastify.put('/dados/:index', async (request, reply) => {
        const { index } = request.params;
        const dadoAtualizado = request.body;
        const data = readJsonFile(filePath);

        if (Array.isArray(data) && data[index]) {
            data[index] = dadoAtualizado;
            writeJsonFile(filePath, data);
            return { message: 'Dado atualizado com sucesso!', dadoAtualizado };
        } else {
            return reply.code(404).send({ error: 'Dado não encontrado!' });
        }
    });

    // Rota para excluir um dado por índice
    fastify.delete('/dados/:index', async (request, reply) => {
        const { index } = request.params;
        const data = readJsonFile(filePath);

        if (Array.isArray(data) && data[index]) {
            const [dadoRemovido] = data.splice(index, 1);
            writeJsonFile(filePath, data);
            return { message: 'Dado removido com sucesso!', dadoRemovido };
        } else {
            return reply.code(404).send({ error: 'Dado não encontrado!' });
        }
    });


}

const getProratedDates = (date, times) => {
    let dates = []
    
    let splittedDate = date.split("-")
    let day = parseInt(splittedDate[0])
    let month = parseInt(splittedDate[1])
    let year = parseInt(splittedDate[2])

    for(let i = 1; i <= times; i++) {
        if(month > 12){
            month = 1
            year++
        }
        dates.push((day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year)
        month++
    }


    return dates
}