const supabase = require("../database/db")

async function buscar(query) {
    try {
        let pontosColeta = supabase
            .from('pontos_coleta')
            .select('pontos_coleta.*, tipos_lixo.tipo as tipo_lixo')
            .innerJoin('tipos_lixo', 'pontos_coleta.tipo_lixo_id', 'tipos_lixo.id')
        if (query.id) {
            pontosColeta = pontosColeta.eq('pontos_coleta.id', query.id)
        }
        if (query.endereco) {
            pontosColeta = pontosColeta.ilike('pontos_coleta.endereco', `%${query.endereco}%`)
        }
        if (query.bairro) {
            pontosColeta = pontosColeta.ilike('pontos_coleta.bairro', `%${query.bairro}%`)
        }
        if (query.tipo_lixo) {
            pontosColeta = pontosColeta.ilike('tipos_lixo.tipo', `%${query.tipo_lixo}%`)
        }
        const { data, error } = await pontosColeta
        if (error) throw error
        return data
    } catch (err) {
        throw err
    }
}

async function inserir(pontoColeta) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .insert(pontoColeta)
            .select('*')
        if (error) throw error
        return data
    } catch (err) {
        throw { id: 500, msg: "Erro ao inserir ponto de coleta." }
    }
}

async function atualizar(id, pontoColeta) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .update(pontoColeta)
            .match({id})
            .select('*')
        if (error) throw error
        return data
    } catch (err) {
        throw { id: 500, msg: "Erro ao atualizar ponto de coleta." }
    }
}

async function deletar(id) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .delete()
            .match({id})
            .select('*')
        if (error) throw error
        return data
    } catch (err) {
        throw { id: 500, msg: "Erro ao deletar ponto de coleta." }
    }
}

module.exports = {
    buscar,
    inserir,
    atualizar,
    deletar
}