const usuarioService = require('../service/usuario_service')

//Listar Usuarios
async function listar(req, res) {
    let email = req.query.email;
    //Se não tiver email no query, é listar
    if(!email) {
        res.json(await usuarioService.listar())
    }
    //Se tiver email no query, é buscarPorEmail
    else {
        try {
            res.json(await usuarioService.buscarPorEmail(email));
        } catch(err) {
            res.status(err.id).json(err)
        }
    }
}

//Inserir
async function inserir(req, res) {
    const usuario = req.body;
    try{
      const usuarioInserido = await usuarioService.inserir(usuario);
      res.status(201).json(usuarioInserido)
    }
    catch(err){
      res.status(err.id).json(err)
    }
}

//Buscar por id
async function buscarPorId(req, res) {
    // O + antes converte o valor para number (na URL vem como string)
    const id = + req.params.id;
    try {
      res.json(await usuarioService.buscarPorId(id));
    } catch(err) {
      res.status(err.id).json(err)
    }
  }

module.exports = {
    listar,
    inserir,
    buscarPorId
}
 