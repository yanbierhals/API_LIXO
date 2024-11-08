
const knex = require('../database/db')

async function listar() {
    try {
        const metas = await knex("metas")
        return metas
    } catch (err) {
        throw err
    }
}

async function buscarPorId(id) {
    try {
        const meta = await knex("metas")
            .where("id", id)
            .first()
        return meta
    } catch (err) {
        throw err
    }
}

async function inserir(meta) {
    try {
        const novaMeta = await knex("metas")
            .insert(meta)
            .returning("*")
        return novaMeta
    } catch (err) {
        throw err
    }
}

async function atualizar(id, meta) {
    try {
        const metaAtualizada = await knex("metas")
            .where("id", id)
            .update(meta)
            .returning("*")
        return metaAtualizada
    } catch (err) {
        throw err
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
        throw err
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}