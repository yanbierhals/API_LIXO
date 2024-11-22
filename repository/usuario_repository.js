const { supabase } = require('../database/db');

async function listar() {
    try {
        const { data: usuarios, error } = await supabase
            .from("usuarios")
            .select("*");
        if (error) throw error;

        // Remove o campo 'senha' antes de retornar os usuários
        return usuarios.map(usuario => removerCampoSenha(usuario));
    } catch (err) {
        throw err;
    }
}

async function buscarPorId(id) {
    try {
        const { data: usuarios, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("id", id);
        if (error) throw  { id: 401, msg: err };

        const usuario = usuarios[0]; // Pega o primeiro (único) usuário
        if (usuario) {
            return removerCampoSenha(usuario);
        }
        throw { id: 404, msg: "Usuário não encontrado" };
    } catch (err) {
        throw  { id: 401, msg: err }
    }
}

async function buscarPorEmail(email) {
    try {
        const { data: usuarios, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("email", email);
        if (error) {
            throw  { id: 401, msg: error }

        };

        const usuario = usuarios[0]; // Pega o primeiro (único) usuário
        return usuario || null; // Retorna `null` se não encontrar
    } catch (err) {
        throw  { id: 401, msg: err }
    }
}

async function inserir(usuario) {
    try {
        if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            throw { id: 400, msg: "Dados do usuário incompletos" };
        }

        const { data: novoUsuario, error } = await supabase
            .from("usuarios")
            .insert(usuario)
            .select("*");
        if (error) throw  { id: 401, msg: error };

        return removerCampoSenha(novoUsuario[0]);
    } catch (err) {
        throw  { id: 401, msg: err }
    }
}

// Função para remover o campo 'senha' de um usuário
function removerCampoSenha(usuario) {
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
    };
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorEmail,
    inserir
};
