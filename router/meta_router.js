const express = require('express')
const router = express.Router();
const metaController = require('../controller/meta_controller')

router.get('/', metaController.listar)
router.post('/', metaController.inserir)
router.get('/:id', metaController.buscarPorId)

module.exports = router;