
import { readJsonFile, writeJsonFile } from './basic.js';
import { randomInt } from 'crypto';

const path = "./src/database/accounts.json"

export const createUser = async (body) => {

    const data = readJsonFile(path);
    let info = {
        ...body,
        id: 1,
        // id: randomInt(1, 100000),
    }
    let joinedData = [...data, info]

    let response = await writeJsonFile(path, joinedData)

    if(response.code === 201) {
        return {code: 201, message: "Usuário criado com sucesso!"};
    } else {
        return {code: 500, message: "Erro ao salvar o usuário"};
    }
}