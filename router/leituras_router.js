const express = require('express');
const router = express.Router();
const leiturasController = require('../controller/leituras_controller');

/**
 * @swagger
 * tags:
 *   name: Leituras
 *   description: Gerenciamento de leituras
 */

/**
 * @swagger
 * /api/leituras:
 *   get:
 *     tags: [Leituras]
 *     summary: Lista todas as leituras
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/', leiturasController.listar);

/**
 * @swagger
 * /api/leituras/{id}:
 *   get:
 *     tags: [Leituras]
 *     summary: Busca uma leitura pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da leitura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Leitura não encontrada
 */
router.get('/:id', leiturasController.buscarPorId);

/**
 * @swagger
 * /api/leituras/inserir:
 *   post:
 *     tags: [Leituras]
 *     summary: Insere uma nova leitura
 *     responses:
 *       201:
 *         description: Leitura criada
 */
router.post('/inserir', leiturasController.inserir);

/**
 * @swagger
 * /api/leituras/atualizar/{id}:
 *   put:
 *     tags: [Leituras]
 *     summary: Atualiza uma leitura existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da leitura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atualização bem-sucedida
 *       404:
 *         description: Leitura não encontrada
 */
router.put('/atualizar/:id', leiturasController.atualizar);

/**
 * @swagger
 * /api/leituras/deletar/{id}:
 *   delete:
 *     tags: [Leituras]
 *     summary: Deleta uma leitura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da leitura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleção bem-sucedida
 *       404:
 *         description: Leitura não encontrada
 */
router.delete('/deletar/:id', leiturasController.deletar);

module.exports = router;
