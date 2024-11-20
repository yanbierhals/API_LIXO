const pontoColetaService = require('../service/pontoColeta_service')

async function buscar(req, res) {		   // Busca pontos de coleta baseados no filtro da consulta (Query Params)
    try {
        const query = req.query
        const pontosColeta = await pontoColetaService.buscar(query)	
        res.json(pontosColeta)
    } catch (err) {
        res.status(err.id).json(err)
    }
}

// Inserir
async function inserir(req, res) {
	const pontoColeta = req.body
	try {
	  	const pontoColetaInserido = await pontoColetaService.inserir(pontoColeta)
	  	res.status(201).json(pontoColetaInserido)
	} catch(err) {
	  	res.status(err.id).json(err)
	}
}

// Atualizar
async function atualizar(req, res) {
	const id = + req.params.id
	const pontoColeta = req.body
	try {
		const pontoColetaAtualizado = await pontoColetaService.atualizar(id, pontoColeta)
		res.json(pontoColetaAtualizado)
  	} catch (err) {
		res.status(err.id).json(err)
  	}
}

// Deletar
async function deletar(req, res) {
  	const id = + req.params.id
	try {
		const pontoColeta = await pontoColetaService.deletar(id)
    	res.json(pontoColeta)
	} catch (err) {
    	res.status(err.id).json(err)
	}
}

module.exports = {
	buscar,
	inserir,
	atualizar,
	deletar
}
