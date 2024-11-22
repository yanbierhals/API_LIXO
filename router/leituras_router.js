const express = require('express')
const router = express.Router()
const leiturasController = require('../controller/leituras_controller')

router.get('/', leiturasController.listar)
router.get('/:id', leiturasController.buscarPorId)
router.post('/inserir', leiturasController.inserir)
router.put('/atualizar/:id', leiturasController.atualizar)
router.delete('/deletar/:id', leiturasController.deletar)

module.exports = router