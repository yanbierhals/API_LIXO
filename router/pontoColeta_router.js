const express = require('express');
const router = express.Router();
const pontoColetaController = require('../controller/pontoColeta_controller');

router.get('/', pontoColetaController.buscar)       // Busca pontos de coleta baseados no filtro da consulta (Query Params)

// // Listar todos os pontos de coleta
// router.get('/', pontoColetaController.listar);

// // Buscar ponto de coleta pelo ID
// router.get('/:id', pontoColetaController.buscarPorId);

// // Buscar ponto de coleta pelo endereço
// router.get('/endereco', pontoColetaController.buscarPorEndereco);

// // Buscar pontos de coleta por tipo de material (usando query params)
// router.get('/tipoLixo', pontoColetaController.buscarPorTipoLixo);

// // Buscar pontos de coleta por bairro (usando query params)
// router.get('/bairro', pontoColetaController.buscarPorBairro);

// Inserir um novo ponto de coleta
router.post('/inserir', pontoColetaController.inserir)

// Atualizar ponto de coleta pelo ID
router.put('/atualizar/:id', pontoColetaController.atualizar)

// Deletar ponto de coleta pelo ID
router.delete('/deletar/:id', pontoColetaController.deletar)

module.exports = router;