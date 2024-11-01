const express = require('express')
const router = express.Router();
const metaController = require('../controller/meta_controller')

router.get('/', metaController.listar)
router.get('/:id', metaController.buscarPorId)
router.post('/inserir', metaController.inserir)
router.put('/atualizar/:id', metaController.atualizar)
router.delete('/deletar/:id', metaController.deletar)

module.exports = router