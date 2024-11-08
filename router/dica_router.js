const express = require('express')
const router = express.Router();
const dicaController = require('../controller/dica_controller')


router.get('/', dicaController.listar)
router.post('/', dicaController.inserir)
router.get('/:id', dicaController.buscarPorId)
router.put('/:id', dicaController.atualizar)
router.delete('/:id', dicaController.deletar)

//rota para busca de dica aleatoria

router.get('dicas/aleatoria',dicaController.buscarAleatoria)

module.exports = router