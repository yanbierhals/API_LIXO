const metaRepository = require('../repository/meta_repository')

function listar() {
    return metaRepository.listar();
}

function inserir(meta) {
    if(meta && meta.nome 
        && meta.email && meta.senha){
            return metaRepository.inserir(meta);
    }
    else {
        throw { id: 400, msg: "meta sem dados corretos"}
    }
}


function buscarPorId(id) {
    let meta = metaRepository.buscarPorId(id);
    if(meta) {
        return meta;
    }
    else {
        throw { id: 404, msg: "meta não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId
}
 