const loginService = require("../service/login_service")

async function realizarLogin(req, res) {
    const usuarioLogin = req.body
    try {
        const token = await loginService.verificarLogin(usuarioLogin)
        res.status(201).json({token: token})
    } catch (err) {
        // Enviar a resposta com status 401 e mensagem de erro
        res.status(401).json({ error: err.msg || "Erro de autenticação" });
    }
}

module.exports = {
    realizarLogin
}