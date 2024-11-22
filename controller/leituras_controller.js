const leiturasService = require('../service/leituras_service')

async function listar(req, res) {
    try {
        const leituras = await leiturasService.listar()
        res.json(leituras)
    } catch (err) {
        res.status(err.id).json(err)
    }
}

async function buscarPorId(req, res) {
    const id = + req.params.id
    try {
      const leituras = await leiturasService.buscarPorId(id)
      res.json(leituras)
    } catch(err) {
      res.status(err.id).json(err)
    }
}

// Inserir
async function inserir(req, res) {
    const leitura = req.body
    try {
        const leituraInserida = await leiturasService.inserir(leitura)
        res.status(201).json(leituraInserida)
    } catch (err) {
        res.status(err.id).json(err)
    }
}

// Atualizar
async function atualizar(req, res) {
    const id = + req.params.id
    const leitura = req.body
    try {
        const leituraAtualizada = await leiturasService.atualizar(id, leitura)
        res.json(leituraAtualizada)
    } catch (err) {
        res.status(err.id).json(err)
    }
}

// Deletar
async function deletar(req, res) {
    const id = + req.params.id
    try {
        const leitura = await leiturasService.deletar(id)
        res.json(leitura)
    } catch (err) {
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