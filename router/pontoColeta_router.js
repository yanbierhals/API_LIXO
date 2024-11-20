const express = require('express')
const router = express.Router()
const pontoColetaController = require('../controller/pontoColeta_controller')

router.get('/', pontoColetaController.buscar)       // Busca pontos de coleta baseados no filtro da consulta (Query Params)

// Inserir um novo ponto de coleta
router.post('/inserir', pontoColetaController.inserir)

// Atualizar ponto de coleta pelo ID
router.put('/atualizar/:id', pontoColetaController.atualizar)

// Deletar ponto de coleta pelo ID
router.delete('/deletar/:id', pontoColetaController.deletar)

module.exports = router