const express = require('express');
const router = express.Router();
const leiturasController = require('../controller/leituras_controller');

router.get('/', leiturasController.buscar)

// Inserir um novo ponto de coleta
router.post('/inserir', leiturasController.inserir)

// Atualizar ponto de coleta pelo ID
router.put('/atualizar/:id', leiturasController.atualizar)

// Deletar ponto de coleta pelo ID
router.delete('/deletar/:id', leiturasController.deletar)

module.exports = router;