const knex = require('../database/db')

async function buscar(query) {
    try {
        let leituras = knex("leituras")
            .join("usuarios", "leituras.usuario_id", "=", "usuarios.id")
            .join("lixeiras", "leituras.lixeira_id", "=", "lixeiras.id")
            .select("leituras.*", "usuarios.nome as usuario", "lixeiras.nome as lixeira");

        if (query.id) {
            leituras = leituras.where("leituras.id", query.id);
        }
        if (query.usuario_id) {
            leituras = leituras.where("leituras.usuario_id", "like", `%${query.usuario_id}%`)
        }
        if (query.lixeira_id) {
            leituras = leituras.where("leituras.lixeira_id", "like", `%${query.lixeira_id}%`)
        }
        if (query.data_leitura) {
            leituras = leituras.where("leituras.data_leitura", "like", `%${query.data_leitura}%`)
        }
        return await leituras;
    } catch (err) {
        throw err
    }
}

async function inserir(leitura) {
    try {
        const novaLeitura = await knex("leituras")
            .insert(leitura)
            .returning("*")
        return novaLeitura
    } catch (err) {
        throw err
    }
}

async function atualizar(id, leitura) {
    try {
        const leituraAtualizada = await knex("leituras")
            .where("id", id)
            .update(leitura)
            .returning("*")
        return leituraAtualizada
    } catch (err) {
        throw err
    }
}

async function deletar(id) {
    try {
        const leituraDeletada = await knex("leituras")
            .where("id", id)
            .delete()
            .returning("*")
        return leituraDeletada
    } catch (err) {
        throw err
    }
}

module.exports = {
    buscar,
    inserir,
    atualizar,
    deletar,
}
 