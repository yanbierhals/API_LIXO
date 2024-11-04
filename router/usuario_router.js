const express = require('express')
const router = express.Router();
const usuarioController = require('../controller/usuario_controller')

router.get('/', usuarioController.listar)
router.get('/:id', usuarioController.buscarPorId)
router.post('/', usuarioController.inserir)

module.exports = router;