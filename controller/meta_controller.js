const metaService = require('../service/meta_service')

//Listar metas
function listar(req, res) {
    let email = req.query.email;
    //Se não tiver email no query, é listar
    if(!email) {
        res.json(metaService.listar())
    }
    //Se tiver email no query, é buscarPorEmail
    else {
        try {
            res.json(metaService.buscarPorEmail(email));
        } catch(err) {
            res.status(err.id).json(err)
        }
    }

}

//Inserir
function inserir(req, res) {
    const meta = req.body;
    try{
      const metaInserido = metaService.inserir(meta);
      res.status(201).json(metaInserido)
    }
    catch(err){
      res.status(err.id).json(err)
    }
}

//Buscar por id
function buscarPorId(req, res) {
    // O + antes converte o valor para number (na URL vem como string)
    const id = +req.params.id;
    try {
      res.json(metaService.buscarPorId(id));
    } catch(err) {
      res.status(err.id).json(err)
    }
  }

module.exports = {
    listar,
    inserir,
    buscarPorId
}
 