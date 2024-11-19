const express = require('express');
const router = express.Router();
const dicaController = require('../controller/dica_controller');

/**
 * @swagger
 * tags:
 *   name: Dicas
 *   description: Gerenciamento de dicas
 */

/**
 * @swagger
 * /dicas:
 *   get:
 *     summary: Lista todas as dicas
 *     tags: [Dicas]
 *     responses:
 *       200:
 *         description: Lista de dicas
 */
router.get('/', dicaController.listar);

/**
 * @swagger
 * /dicas:
 *   post:
 *     summary: Insere uma nova dica
 *     tags: [Dicas]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Dica criada com sucesso
 */
router.post('/', dicaController.inserir);

/**
 * @swagger
 * /dicas/{id}:
 *   get:
 *     summary: Busca uma dica pelo ID
 *     tags: [Dicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da dica
 *     responses:
 *       200:
 *         description: Dica encontrada
 *       404:
 *         description: Dica não encontrada
 */
router.get('/:id', dicaController.buscarPorId);

/**
 * @swagger
 * /dicas/{id}:
 *   put:
 *     summary: Atualiza uma dica pelo ID
 *     tags: [Dicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da dica
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Dica atualizada com sucesso
 *       404:
 *         description: Dica não encontrada
 */
router.put('/:id', dicaController.atualizar);

/**
 * @swagger
 * /dicas/{id}:
 *   delete:
 *     summary: Remove uma dica pelo ID
 *     tags: [Dicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da dica
 *     responses:
 *       200:
 *         description: Dica removida com sucesso
 *       404:
 *         description: Dica não encontrada
 */
router.delete('/:id', dicaController.deletar);

/**
 * @swagger
 * /dicas/aleatoria:
 *   get:
 *     summary: Retorna uma dica aleatória
 *     tags: [Dicas]
 *     responses:
 *       200:
 *         description: Dica aleatória
 */
router.get('/aleatoria', dicaController.buscarAleatoria); // Corrigido para incluir a barra inicial

module.exports = router;
