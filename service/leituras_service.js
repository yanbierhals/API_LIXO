const leiturasRepository = require('../repository/leituras_repository')
const knex = require('../database/db')

async function buscar(query) {
    try {
        const leitura = await leituras_repository.buscar(query);
        if (leitura.length > 0) {
            return leitura
        } else {
            if (query.id) {
                throw { id: 404, msg: `Nenhuma leitura encontrada com o ID: ${query.id}.` };
            }
            if (query.usuario_id) {
                throw { id: 404, msg: `Nenhuma leitura encontrada para o usuário ID: ${query.usuario_id}.` };
            }
            if (query.lixeira_id) {
                throw { id: 404, msg: `Nenhuma leitura encontrada para a lixeira ID: ${query.lixeira_id}.` };
            }
            if (query.data_leitura) {
                throw { id: 404, msg: `Nenhuma leitura encontrada para a data: ${query.data_leitura}.` };
            }
        }
    } catch (err) {
        if (err.id === 404) {
            throw err
        }
        throw { id: 500, msg: "Erro ao buscar leituras!" }
    }
}

async function inserir(leitura) {
    if (!leitura || !leitura.usuario_id || !leitura.lixeira_id || !leitura.data_leitura) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const usuario = await knex("usuarios")
            .select("id")
            .where("id", leitura.usuario_id)
            .first();
        if (!usuario) {
            throw { id: 404, msg: "Usuário não encontrado." };
        }

        const lixeira = await knex("lixeiras")
            .select("id")
            .where("id", leitura.lixeira_id)
            .first();
        if (!lixeira) {
            throw { id: 404, msg: "Lixeira não encontrada." };
        }
        
        return await pontoColetaRepository.inserir(pontoColeta)
    } catch (err) {
        if (err.id == 404) {
            throw err
        }
        throw { id: 500, msg: "Erro ao inserir leitura." }
    }
}

async function atualizar(id, leitura) {
    if (!leitura || !leitura.usuario_id || !leitura.lixeira_id || !leitura.data_leitura) {
        throw { id: 400, msg: "Dados obrigatórios faltando." };
    }
    try {
        const usuario = await knex("usuarios")
            .select("id")
            .where("id", leitura.usuario_id)
            .first();
        if (!usuario) {
            throw { id: 404, msg: "Usuário não encontrado." };
        }
        
        const leituraAtualizada = await leiturasRepository.atualizar(id, leitura);
        if (leituraAtualizada && leituraAtualizada.length > 0) {
            return leituraAtualizada;
        } else {
            throw { id: 404, msg: "Leitura não encontrada." };
        }
    } catch (err) {
        if (err.id == 404) {
            throw err;
        }
        throw { id: 500, msg: "Erro ao atualizar leitura." };
    }
}

async function deletar(id) {
    try {
        const leitura = await leiturasRepository.deletar(id);
        if (leitura && leitura.length > 0) {
            return leitura;
        } else {
            throw { id: 404, msg: "Leitura não encontrada." };
        }
    } catch (err) {
        if (err.id == 404) {
            throw err;
        }
        throw { id: 500, msg: "Erro ao deletar leitura." };
    }
}

module.exports = {
    buscar,
    inserir,
    atualizar,
    deletar
}