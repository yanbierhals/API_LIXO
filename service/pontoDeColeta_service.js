const pontoDeColetaRepository = require('../repository/pontoDeColeta_repository');

function listar() {
    return pontoDeColetaRepository.listar();
}

function inserir(pontoDeColeta) {
    if(pontoDeColeta && pontoDeColeta.nome 
        && pontoDeColeta.endereco && pontoDeColeta.bairro && pontoDeColeta.tipoLixo){
            return pontoDeColetaRepository.inserir(pontoDeColeta);
    }
    else {
        throw { id: 400, msg: "Ponto de coleta sem dados corretos."}
    }
}

function buscarPorId(id) {
    let resultados = pontoDeColetaRepository.buscarPorId(id);
    if(resultados) {
        return resultados;
    } else {
        throw { id: 404, msg: "Ponto de coleta não encontrado!" };
    }
}

function buscarPorEndereco(endereco) {

    if(!endereco) {
        throw {id: 400, msg: "O parâmetro 'endereco' é obrigatório."};
    }

    let resultados = pontoDeColetaRepository.buscarPorEndereco(endereco);
    
    if (Array.isArray(resultados) && resultados.length > 0) {
        return resultados;
    } else {
        throw { id: 404, msg: "Verifique o endereço, ponto de coleta não encontrado."}
    }
}

function buscarPorTipoLixo(tipoLixo) {

    if(!tipoLixo) {
        throw {id: 400, msg: "O parâmetro 'tipoLixo' é obrigatório."};
    }

    let resultados = pontoDeColetaRepository.buscarPorTipoLixo(tipoLixo);
    
    if (Array.isArray(resultados) && resultados.length > 0) {
        return resultados;
    } else {
        throw { id: 404, msg: "Verifique as informações, ponto de coleta não encontrado."}
    }
}

function buscarPorBairro(bairro) {

    if(!bairro) {
        throw {id: 400, msg: "O parâmetro 'bairro' é obrigatório."};
    }

    let resultados = pontoDeColetaRepository.buscarPorBairro(bairro);
    
    if (Array.isArray(resultados) && resultados.length > 0) {
        return resultados;
    } else {
        throw { id: 404, msg: "Verifique as informações, ponto de coleta não encontrado."}
    }
}

function atualizar(id, pontoDeColeta) {
    if (typeof id !== 'number' || id <= 0) {
        throw { id: 400, msg: "ID inválido." };
    }

    if(pontoDeColeta && pontoDeColeta.nome && pontoDeColeta.endereco && pontoDeColeta.bairro && pontoDeColeta.tipoLixo) {
        try {
            const pontoDeColetaAtualizado = pontoDeColetaRepository.atualizar(id, pontoDeColeta);
            if(pontoDeColetaAtualizado) {
                return pontoDeColetaAtualizado;
            } else {
                throw {id:404, msg: "Ponto de coleta não encontrado"};
            }
        } catch (error) {
            throw { id: 500, msg: "Erro ao atualizar ponto de coleta." }; // Erro genérico
        }
    } else {
        throw {id:400, msg: "Ponto de coleta com dados incorretos"};
    }
}

function deletar(id) {
    console.log(`Service: Tentando deletar ponto de coleta com ID: ${id}`);
    if (typeof id !== 'number' || id <= 0) {
        throw { id: 400, msg: "ID inválido." };
    }

    console.log(`Tentando deletar ponto de coleta com ID: ${id}`);

    const pontoDeColeta = pontoDeColetaRepository.deletar(id);

    if(pontoDeColeta) {
        console.log("Service: Ponto de coleta deletado com sucesso", pontoDeColeta);
        return { msg: "Ponto de coleta deletado com sucesso", pontoDeColeta };
    } else {
        throw { id: 404, msg: "Ponto de coleta não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEndereco,
    buscarPorTipoLixo,
    buscarPorBairro,
    atualizar,
    deletar
}