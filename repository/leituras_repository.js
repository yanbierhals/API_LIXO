const { supabase } = require('../database/db')

async function listar() {
    try {
        const { data: leituras, error } = await supabase
            .from("leituras")
            .select("*")
        if (error) throw error
        return leituras
    } catch (err) {
        throw err
    }
}

async function buscarPorId(id) {
    try {
        const { data: leitura, error } = await supabase
            .from("leituras")
            .select("*")
            .eq("id_usuario", id)
        if (error) throw error
        return leitura
    } catch (err) {
        throw err
    }
}

async function inserir(leitura) {
    try {
        const { data: novaLeitura, error } = await supabase
            .from("leituras")
            .insert(leitura)
            .select("*")
        if (error) throw error
        return novaLeitura
    } catch (err) {
        throw err
    }
}

async function atualizar(id, leitura) {
    try {
        const { data: leituraAtualizada, error } = await supabase
            .from("leituras")
            .update(leitura)
            .eq("id", id)
            .select("*")
        if (error) throw error
        return leituraAtualizada
    } catch (err) {
        throw err
    }
}

async function deletar(id) {
    try {
        const {data: leituraDeletada, error } = await supabase
            .from("leituras")
            .delete()
            .eq("id", id)
            .select("*")
        if (error) throw error
        return leituraDeletada
    } catch (err) {
        throw err
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar,
}