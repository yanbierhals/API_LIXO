const { supabase } = require("../database/db")

async function listar() {
    try {
        const { data: metas, error } = await supabase
            .from("metas")
            .select("*")
        if (error) throw error
        return metas
    } catch (err) {
        throw err
    }
}

async function buscarPorId(id) {
    try {
        const { data: meta, error } = await supabase
            .from("metas")
            .select("*")
            .eq("id", id)
            .single()
        if (error) throw error
        return meta
    } catch (err) {
        throw err
    }
}

async function inserir(meta) {
    try {
        const { data: novaMeta, error } = await supabase
            .from("metas")
            .insert(meta)
            .select("*")
        if (error) throw error
        return novaMeta
    } catch (err) {
        throw err
    }
}

async function atualizar(id, meta) {
    try {
        const { data: metaAtualizada, error } = await supabase
            .from("metas")
            .update(meta)
            .eq("id", id)
            .select("*")
        if (error) throw error
        return metaAtualizada
    } catch (err) {
        throw err
    }
}

async function deletar(id) {
    try {
        const { data: meta, error } = await supabase
            .from("metas")
            .delete()
            .eq("id", id)
            .select("*")
        if (error) throw error
        return meta
    } catch (err) {
        throw err
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}