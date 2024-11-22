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
 *     summary: Lista todas as leituras
 *     tags: [Leituras]
 *     responses:
 *       200:
 *         description: Lista de leituras
 */
router.get('/', leiturasController.listar);

/**
 * @swagger
 * /api/leituras/{id}:
 *   get:
 *     summary: Busca uma leitura pelo ID
 *     tags: [Leituras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da leitura
 *     responses:
 *       200:
 *         description: Leitura encontrada
 *       404:
 *         description: Leitura não encontrada
 */
router.get('/:id', leiturasController.buscarPorId);

/**
 * @swagger
 * /api/leituras/inserir:
 *   post:
 *     summary: Insere uma nova leitura
 *     tags: [Leituras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *               unidade:
 *                 type: string
 *               dataLeitura:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Leitura criada com sucesso
 */
router.post('/inserir', leiturasController.inserir);

/**
 * @swagger
 * /api/leituras/atualizar/{id}:
 *   put:
 *     summary: Atualiza uma leitura pelo ID
 *     tags: [Leituras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da leitura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *               unidade:
 *                 type: string
 *               dataLeitura:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Leitura atualizada com sucesso
 *       404:
 *         description: Leitura não encontrada
 */
router.put('/atualizar/:id', leiturasController.atualizar);

/**
 * @swagger
 * /api/leituras/deletar/{id}:
 *   delete:
 *     summary: Remove uma leitura pelo ID
 *     tags: [Leituras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da leitura
 *     responses:
 *       200:
 *         description: Leitura removida com sucesso
 *       404:
 *         description: Leitura não encontrada
 */
router.delete('/deletar/:id', leiturasController.deletar);

module.exports = router;
