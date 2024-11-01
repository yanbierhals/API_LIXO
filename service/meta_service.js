const metaRepository = require('../repository/meta_repository')

function listar(){
    return metaRepository.listar()
}

function buscarPorId(id){
    let meta = metaRepository.buscarPorId(id)
    if(meta){
        return meta
    } else {
        throw { id: 404, msg: "Meta não encontrada!" }
    }
}

function inserir(meta){
    if(meta && meta.nome && meta.descricao && meta.objetivo){
        return metaRepository.inserir(meta)
    } else {
        throw { id: 400, msg: "Não foi possível inserir a meta."}
    }
}

function atualizar(id, meta){
    if(meta && meta.nome && meta.descricao && meta.objetivo){
        const metaAtualizada = metaRepository.atualizar(id, meta)
        if(metaAtualizada){
            return metaAtualizada
        }        
        else {
            throw {id:404, msg: "Meta não encontrada."}
        }
    }
    else {
        throw {id:400, msg: "Dados incorretos."}
    }
}

function deletar(id){
    let meta = metaRepository.deletar(id)
    if(meta) {
        return meta
    }
    else {
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