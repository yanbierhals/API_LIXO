const dicaRepository = require('../repository/dica_repository')

function listar() {
    return dicaRepository.listar();
}

function inserir(dica) {
    if(dica && dica.nome && dica.descricao){
            return dicaRepository.inserir(dica);
    }
    else {
        throw { id: 400, msg: "Dica sem dados corretos"}
    }
}

function buscarPorId(id) {
    let dica = dicaRepository.buscarPorId(id);
    if(dica) {
        return dica;
    }
    else {
        throw { id: 404, msg: "Dica não encontrada!" }
    }
}

function buscarAleatoria(){
    return dicaRepository.buscarAleatoria()
}


function atualizar(id, dica) {
    if(dica && dica.nome && dica.descricao) {
        const dicaAtualizada = dicaRepository.atualizar(id, dica);
        if(dicaAtualizada) {
            return dicaAtualizada;
        }        
        else {
            throw {id:404, msg: "Dica não encontrada"};
        }
    }
    else {
        throw {id:400, msg: "Dica sem dados corretos"};
    }
}

function deletar(id) {
    let dica = dicaRepository.deletar(id);
    if(dica) {
        return dica;
    }
    else {
        throw { id: 404, msg: "Dica não encontrada!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    buscarAleatoria
}