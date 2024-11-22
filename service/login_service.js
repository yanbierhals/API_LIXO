const usuarioRepository = require('../repository/usuario_repository')
const jwt = require('jsonwebtoken')
const PALAVRA_CHAVE = "Sen@c2024"

async function verificarLogin(usuarioLogin) {
    if (!usuarioLogin || !usuarioLogin.email || !usuarioLogin.senha) {
        throw { id: 401, msg: "Usuario ou senha inválidos." }
    }

    try {
        let usuario = await usuarioRepository.buscarPorEmail(usuarioLogin.email)

        if(!usuario){
            throw { id: 401, msg: "Email não cadastrado" }
        }

        if (usuario) {
            if (usuario.senha == usuarioLogin.senha) {
                let token = jwt.sign(
                    { userId: usuario.id }, 
                    PALAVRA_CHAVE,  
                    { expiresIn: '2h' }
                )
                return token
            }
            else {throw { id: 401, msg: "Senha Incorreta" }}
        }
    } catch (err) {
        throw { id: 401, msg: err }
    }
}

async function validarToken(token) {
    try {
        const payload = jwt.verify(token, PALAVRA_CHAVE)
        console.log("Payload", payload)
    } catch (err) {
        console.log("Erro no Token", err)
        throw  { id: 401, msg: "Token Inválido!" }
    }
}

module.exports = {
    verificarLogin,
    validarToken
}
