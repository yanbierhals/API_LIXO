const metaService = require('../service/meta_service')

//Listar metas
function listar(req, res) {
    res.json(metaService.listar())
}

//Buscar por id
function buscarPorId(req, res){
  	// O + antes converte o valor para number (na URL vem como string)
  	const id = + req.params.id
  	try {
    	res.json(metaService.buscarPorId(id))
  	} catch(err) {
    res.status(err.id).json(err)
  	}
}

//Inserir
function inserir(req, res){
	const meta = req.body
  	try{
    	const metaInserida = metaService.inserir(meta)
      	res.status(201).json(metaInserida)
    }
    catch(err){
      	res.status(err.id).json(err)
    }
}

//Atualizar
function atualizar(req, res){
  	const id = + req.params.id
  	const meta = req.body
  	try {
    	const metaAtualizada = metaService.atualizar(id, meta)
    	res.json(metaAtualizada)
	} catch(err){
    	res.status(err.id).json(err)
  	}
}

//Deletar
function deletar(req, res){
  	const id = + req.params.id
  	try {
    	res.json(metaService.deletar(id))
  	} catch(err) {
    	res.status(err.id).json(err)
  	}
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}