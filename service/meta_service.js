
const metaRepository = require('../repository/meta_repository')

async function listar() {
    try {
        const metas = await metaRepository.listar()
        return metas
    } catch (err) {
        throw { id: 500, msg: "Erro ao listar as metas!" }
    }
}

async function buscarPorId(id) {
    try {
        const meta = await metaRepository.buscarPorId(id)
        if (!meta) {
            throw { id: 404, msg: "Meta não encontrada!" }
        }
        return meta
    } catch (err) {
        throw { id: 500, msg: "Erro ao buscar meta." }
    }
}

async function inserir(meta) {
    if (!meta || !meta.nome || !meta.descricao || !meta.objetivo) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        return await metaRepository.inserir(meta)
    } catch (err) {
        throw { id: 500, msg: "Erro ao inserir a meta." }
    }
}

async function atualizar(id, meta) {
    if (!meta || !meta.nome || !meta.descricao || !meta.objetivo) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const metaAtualizada = await metaRepository.atualizar(id, meta)
        if (metaAtualizada && metaAtualizada.length > 0) {
            return metaAtualizada
        } else {
            throw { id: 404, msg: "Meta não encontrada." }
        }
    } catch (err) {
        throw { id: 500, msg: "Erro ao atualizar a meta." }
    }
}

async function deletar(id) {
    try {
        const meta = await metaRepository.deletar(id)
        if (meta && meta.length > 0) {
            return meta
        } else {
            throw { id: 404, msg: "Meta não encontrada!" }
        }
    } catch (err) {
        throw { id: 500, msg: "Erro ao deletar a meta." }
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}