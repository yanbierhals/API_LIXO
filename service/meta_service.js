
const metaRepository = require('../repository/meta_repository')

async function listar() {
    const metas = await metaRepository.listar()
    return metas
}

async function buscarPorId(id) {
    let meta = await metaRepository.buscarPorId(id)
    if (meta) {
        return meta
    } else {
        throw { id: 404, msg: "Meta não encontrada!" }
    }
}

async function inserir(meta) {
    if (meta && meta.nome && meta.descricao && meta.objetivo) {
        return await metaRepository.inserir(meta)
    } else {
        throw { id: 400, msg: "Não foi possível inserir a meta." }
    }
}

async function atualizar(id, meta) {
    if (meta && meta.nome && meta.descricao && meta.objetivo) {
        const metaAtualizada = await metaRepository.atualizar(id, meta)
        if (metaAtualizada && metaAtualizada.length > 0) {
            return metaAtualizada
        } else {
            throw { id:404, msg: "Meta não encontrada." }
        }
    } else {
        throw { id:400, msg: "Dados incorretos." }
    }
}

async function deletar(id) {
    let meta = await metaRepository.deletar(id)
    if (meta && meta.length > 0) {
        return meta
    } else {
        throw { id: 404, msg: "Meta não encontrada!" }
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}