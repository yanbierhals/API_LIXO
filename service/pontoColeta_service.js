const pontoColetaRepository = require('../repository/pontoColeta_repository')
const knex = require('../database/db')

async function buscar(query) {
    try {
        const pontoColeta = await pontoColetaRepository.buscar(query)
        if (pontoColeta.length > 0) {
            return pontoColeta
        } else {
            if (query.id) {
                throw { id: 404, msg: `Nenhum Ponto de Coleta encontrado com o ID: ${query.id}.` }
            } if (query.endereco) {
                throw { id: 404, msg: `Nenhum Ponto de Coleta encontrado com o Endereço: ${query.endereco}.` }
            } if (query.bairro) {
                throw { id: 404, msg: `Nenhum Ponto de Coleta encontrado no Bairro: ${query.bairro}.` }
            } if (query.tipo_lixo) {
                throw { id: 404, msg: `Nenhum Ponto de Coleta encontrado com o Tipo de Lixo: ${query.tipo_lixo}.` }
            }
        }
    } catch (err) {
        if (err.id === 404) {
            throw err
        }
        throw { id: 500, msg: "Erro ao buscar pontos de coleta!" }
    }
}

// function listar() {
//     return pontoColetaRepository.listar();
// }

// function buscarPorId(id) {
//     let resultados = pontoColetaRepository.buscarPorId(id);
//     if(resultados) {
//         return resultados;
//     } else {
//         throw { id: 404, msg: "Ponto de coleta não encontrado!" };
//     }
// }

// function buscarPorEndereco(endereco) {
    
//     if(!endereco) {
//         throw {id: 400, msg: "O parâmetro 'endereco' é obrigatório."};
//     }
    
//     let resultados = pontoColetaRepository.buscarPorEndereco(endereco);
    
//     if (Array.isArray(resultados) && resultados.length > 0) {
//         return resultados;
//     } else {
//         throw { id: 404, msg: "Verifique o endereço, ponto de coleta não encontrado."}
//     }
// }

// function buscarPorTipoLixo(tipoLixo) {
    
//     if(!tipoLixo) {
//         throw {id: 400, msg: "O parâmetro 'tipoLixo' é obrigatório."};
//     }
    
//     let resultados = pontoColetaRepository.buscarPorTipoLixo(tipoLixo);
    
//     if (Array.isArray(resultados) && resultados.length > 0) {
//         return resultados;
//     } else {
//         throw { id: 404, msg: "Verifique as informações, ponto de coleta não encontrado."}
//     }
// }

// function buscarPorBairro(bairro) {
    
//     if(!bairro) {
//         throw {id: 400, msg: "O parâmetro 'bairro' é obrigatório."};
//     }
    
//     let resultados = pontoColetaRepository.buscarPorBairro(bairro);
    
//     if (Array.isArray(resultados) && resultados.length > 0) {
//         return resultados;
//     } else {
//         throw { id: 404, msg: "Verifique as informações, ponto de coleta não encontrado."}
//     }
// }

async function inserir(pontoColeta) {
    if (!pontoColeta || !pontoColeta.nome || !pontoColeta.endereco || !pontoColeta.bairro || !pontoColeta.tipo_lixo_id) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const tipoLixo = await knex("tipos_lixo")
            .select("id")
            .where("tipo", pontoColeta.tipo_lixo_id)
            .first()
        if (!tipoLixo) {
            throw { id: 404, msg: "Tipo de lixo não encontrado." }
        }
        pontoColeta.tipo_lixo_id = tipoLixo.id
        return await pontoColetaRepository.inserir(pontoColeta)
    } catch (err) {
        if (err.id == 404) {
            throw err
        }
        throw { id: 500, msg: "Erro ao inserir ponto de coleta." }
    }
}

async function atualizar(id, pontoColeta) {
    if (!pontoColeta || !pontoColeta.nome || !pontoColeta.endereco || !pontoColeta.bairro || !pontoColeta.tipo_lixo_id) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const tipoLixo = await knex("tipos_lixo")
            .select("id")
            .where("tipo", pontoColeta.tipo_lixo_id)
            .first()
        if (!tipoLixo) {
            throw { id: 404, msg: "Tipo de lixo não encontrado." }
        }
        pontoColeta.tipo_lixo_id = tipoLixo.id
        const pontoColetaAtualizado = await pontoColetaRepository.atualizar(id, pontoColeta)
        if (pontoColetaAtualizado && pontoColetaAtualizado.length > 0) {
                return pontoColetaAtualizado
        } else {
            throw {id: 404, msg: "Ponto de coleta não encontrado."}
        }
    } catch (err) {
        if (err.id == 404) {
            throw err
        }
        throw { id: 500, msg: "Erro ao atualizar ponto de coleta." }
    }
}

async function deletar(id) {
    try {
        const pontoColeta = await pontoColetaRepository.deletar(id)
        if (pontoColeta && pontoColeta.length > 0) {
            return pontoColeta
        } else {
            throw { id: 404, msg: "Ponto de coleta não encontrado." }
        }
    } catch (err) {
        if (err.id == 404) {
            throw err
        }
        throw { id: 500, msg: "Erro ao deletar ponto de coleta." }
    }
}

module.exports = {
    // listar,
    // buscarPorId,
    // buscarPorEndereco,
    // buscarPorTipoLixo,
    // buscarPorBairro,
    buscar,
    inserir,
    atualizar,
    deletar
}