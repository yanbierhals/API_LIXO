const leiturasRepository = require('../repository/leituras_repository')
const { supabase } = require('../database/db')
const { error } = require('console')

async function listar() {
    try {
        const leituras = await leiturasRepository.listar()
        return leituras
    } catch (err) {
        throw { id: 500, msg: "Erro ao listar leituras!" }
    }
}

async function buscarPorId(id) {
    try {
        const leitura = await leiturasRepository.buscarPorId(id)
        if (!leitura) throw { id: 404, msg: "Leitura não encontrada!" }
        return leitura
    } catch (err) {
        if (err.id === 404) throw err
        throw { id: 500, msg: "Erro ao buscar leitura." }
    }
}

async function inserir(leitura) {
    if (!leitura || !leitura.id_usuario || !leitura.id_lixeira) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const { data: usuario, error: usuarioError } = await supabase
            .from("usuarios")
            .select("id")
            .eq("id", leitura.id_usuario)
            .maybeSingle()
        if (!usuario) throw { id: 404, msg: "Usuário não encontrado." }
        if (usuarioError) throw usuarioError
        const { data: lixeira, error: lixeiraError } = await supabase
            .from("lixeiras")
            .select("id")
            .eq("id", leitura.id_lixeira)
            .maybeSingle()
        if (!lixeira) throw { id: 404, msg: "Lixeira não encontrada." }
        if (lixeiraError) throw lixeiraError
        return await leiturasRepository.inserir(leitura)
    } catch (err) {
        if (err.id === 404) throw err
        throw { id: 500, msg: "Erro ao inserir leitura." }
    }
}

async function atualizar(id, leitura) {
    if (!leitura || !leitura.id_usuario || !leitura.id_lixeira) {
        throw { id: 400, msg: "Dados obrigatórios faltando." }
    }
    try {
        const { data: usuario, error: usuarioError } = await supabase
            .from("usuarios")
            .select("id")
            .eq("id", leitura.id_usuario)
            .maybeSingle()
        if (!usuario) throw { id: 404, msg: "Usuário não encontrado." }
        if (usuarioError) throw usuarioError
        const { data: lixeira, error: lixeiraError } = await supabase
            .from("lixeiras")
            .select("id")
            .eq("id", leitura.id_lixeira)
            .maybeSingle()
        if (!lixeira) throw { id: 404, msg: "Lixeira não encontrada." }
        if (lixeiraError) throw lixeiraError
        const leituraAtualizada = await leiturasRepository.atualizar(id, leitura)
        if (leituraAtualizada.length === 0) throw { id: 404, msg: "Leitura não encontrada." }
        return leituraAtualizada
    } catch (err) {
        if (err.id == 404) throw err
        throw { id: 500, msg: "Erro ao atualizar leitura." }
    }
}

async function deletar(id) {
    try {
        const leitura = await leiturasRepository.deletar(id)
        if (leitura.length === 0) throw { id: 404, msg: "Leitura não encontrada." }
        return leitura
    } catch (err) {
        if (err.id == 404) throw err
        throw { id: 500, msg: "Erro ao deletar leitura." }
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}