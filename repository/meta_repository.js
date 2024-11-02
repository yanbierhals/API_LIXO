// let listaMetas = [
//     {
//         "id": 1,
//         "nome": "seco",
//         "descricao": "descartar o lixo seco 2 vezes por semana",
//         "objetivo": 2
//     }
// ]

// let idGerador = 1

const knex = require('../database/db')

async function listar() {
    try {
        const metas = await knex("metas")
        return metas
    } catch (err) {
        throw { id: 404, msg: "Erro ao listar as metas!" }
    }
}

async function buscarPorId(id) {
    try {
        const meta = await knex("metas")
            .where("id", id)
            .first()
        return meta
    } catch (err) {
        throw { id: 404, msg: "Erro ao buscar meta!" }
    }
}

async function inserir(meta) {
    if (!meta || !meta.nome || !meta.descricao || !meta.objetivo) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const novaMeta = await knex("metas")
            .insert(meta)
            .returning("*")
        return novaMeta
    } catch (err) {
        throw { id: 500, msg: "Erro ao inserir a meta." }
    }
}

async function atualizar(id, meta) {
    if (!meta || !meta.nome || !meta.descricao || !meta.objetivo) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const metaAtualizada = await knex("metas")
            .where("id", id)
            .update(meta)
            .returning("*")
        return metaAtualizada
    } catch (err) {
        throw { id: 500, msg: "Erro ao atualizar a meta." }
    }
}

async function deletar(id) {
    try {
        const meta = await knex("metas")
            .where("id", id)
            .delete()
            .returning("*")
        return meta
    } catch {
        throw { id: 500, msg: "Erro ao deletar a meta." }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}