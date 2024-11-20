const pontoColetaRepository = require('../repository/pontoColeta_repository')
const supabase = require("../database/db")

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

async function inserir(pontoColeta) {
    if (!pontoColeta || !pontoColeta.nome || !pontoColeta.endereco || !pontoColeta.bairro || !pontoColeta.tipo_lixo_id) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const { data: tipoLixo, error } = await supabase
            .from('tipos_lixo')
            .select('id')
            .eq('tipo', pontoColeta.tipo_lixo_id)
            .single()
        if (error || !tipoLixo) {
            throw { id: 404, msg: "Tipo de lixo não encontrado." }
        }
        pontoColeta.tipo_lixo_id = tipoLixo.id
        return await pontoColetaRepository.inserir(pontoColeta)
    } catch (err) {
        if (err.id === 404) {
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
        const { data: tipoLixo, error: tipoLixoError } = await supabase
            .from('tipos_lixo')
            .select('id')
            .eq('tipo', pontoColeta.tipo_lixo_id)
            .single()
        if (tipoLixoError || !tipoLixo) {
            throw { id: 404, msg: "Tipo de lixo não encontrado." }
        }
        pontoColeta.tipo_lixo_id = tipoLixo.id
        const { data, error } = await supabase
            .from('pontos_coleta')
            .update(pontoColeta)
            .eq('id', id)
        if (error || !data) {
            throw { id: 404, msg: "Ponto de coleta não encontrado." }
        }
        return data
    } catch (err) {
        if (err.id == 404) throw err
        throw { id: 500, msg: "Erro ao atualizar ponto de coleta." }
    }
}

async function deletar(id) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .delete()
            .eq('id', id)
        if (error || !data) {
            throw { id: 404, msg: "Ponto de coleta não encontrado." }
        }
        return data
    } catch (err) {
        if (err.id == 404) throw err
        throw { id: 500, msg: "Erro ao deletar ponto de coleta." }
    }
}

module.exports = {
    buscar,
    inserir,
    atualizar,
    deletar
}