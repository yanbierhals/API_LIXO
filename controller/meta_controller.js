
const metaService = require('../service/meta_service')

//Listar metas
async function listar(req, res) {
    try {
        const metas = await metaService.listar()
        res.json(metas)
    } catch (err) {
        res.status(err.id).json(err)
    }
}

//Buscar por id
async function buscarPorId(req, res) {
  	// O + antes converte o valor para number (na URL vem como string)
  	const id = + req.params.id
  	try {
		const meta = await metaService.buscarPorId(id)
    	res.json(meta)
  	} catch(err) {
    	res.status(err.id).json(err)
  	}
}

//Inserir
async function inserir(req, res) {
	const meta = req.body
  	try {
    	const metaInserida = await metaService.inserir(meta)
      	res.status(201).json(metaInserida)
    } catch(err) {
      	res.status(err.id).json(err)
    }
}

//Atualizar
async function atualizar(req, res) {
  	const id = + req.params.id
  	const meta = req.body
  	try {
    	const metaAtualizada = await metaService.atualizar(id, meta)
    	res.json(metaAtualizada)
	} catch(err) {
    	res.status(err.id).json(err)
  	}
}

//Deletar
async function deletar(req, res) {
  	const id = + req.params.id
  	try {
		const meta = await metaService.deletar(id)
    	res.json(meta)
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