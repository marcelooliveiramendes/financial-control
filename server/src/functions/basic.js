import fs from 'node:fs'

export const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo JSON:', err);
        return [];
    }
};

// Função auxiliar para escrever no arquivo JSON
export const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return { 'code': 201, 'message': "Usuário criado com sucesso!"}
    } catch (err) {
        console.error('Erro ao escrever no arquivo JSON:', err);
        return { 'code': 404, 'message': "Erro ao escrever no arquivo JSON"}
    }
};