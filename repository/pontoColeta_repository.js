const { supabase } = require("../database/db")

async function buscar(query) {
    try {
        let pontosColeta = supabase
            .from('pontos_coleta')
            .select('*, tipos_lixo!inner(tipo)')
        if (query.id) pontosColeta = pontosColeta.eq('id', query.id)
        if (query.endereco) pontosColeta = pontosColeta.ilike('endereco', `%${query.endereco}%`)
        if (query.bairro) pontosColeta = pontosColeta.ilike('bairro', `%${query.bairro}%`)
        if (query.tipo_lixo) pontosColeta = pontosColeta.ilike('tipos_lixo.tipo', `%${query.tipo_lixo}%`)
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
        throw err
    }
}

async function atualizar(id, pontoColeta) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .update(pontoColeta)
            .eq('id', id)
            .select('*')
        if (error || !data) throw error
        return data
    } catch (err) {
        throw err
    }
}

async function deletar(id) {
    try {
        const { data, error } = await supabase
            .from('pontos_coleta')
            .delete()
            .eq('id', id)
            .select('*')
        if (error) throw error
        return data
    } catch (err) {
        throw err
    }
}

module.exports = {
    buscar,
    inserir,
    atualizar,
    deletar
}