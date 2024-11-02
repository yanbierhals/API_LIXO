const express = require('express');
const router = express.Router();
const pontoDeColetaController = require('../controller/pontoDeColeta_controller');

// Listar todos os pontos de coleta
router.get('/', pontoDeColetaController.listar);

// Inserir um novo ponto de coleta
router.post('/', pontoDeColetaController.inserir);

// Buscar ponto de coleta pelo endereço
router.get('/getend/endereco', pontoDeColetaController.buscarPorEndereco);

// Buscar ponto de coleta pelo ID
router.get('/:id', pontoDeColetaController.buscarPorId);

// Buscar pontos de coleta por tipo de material (usando query params)
router.get('/getlixo/tipoLixo', pontoDeColetaController.buscarPorTipoLixo);

// Buscar pontos de coleta por bairro (usando query params)
router.get('/getbairro/bairro', pontoDeColetaController.buscarPorBairro);

// Atualizar ponto de coleta pelo ID
router.put('/:id', pontoDeColetaController.atualizar);

// Deletar ponto de coleta pelo ID
router.delete('/:id', pontoDeColetaController.deletar);

module.exports = router;
