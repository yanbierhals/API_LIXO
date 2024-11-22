const express = require('express');
const router = express.Router();
const metaController = require('../controller/meta_controller');

/**
 * @swagger
 * tags:
 *   name: Metas
 *   description: Gerenciamento de metas
 */

/**
 * @swagger
 * /api/metas:
 *   get:
 *     summary: Lista todas as metas
 *     tags: [Metas]
 *     responses:
 *       200:
 *         description: Lista de metas
 */
router.get('/', metaController.listar);

/**
 * @swagger
 * /api/metas/{id}:
 *   get:
 *     summary: Busca uma meta pelo ID
 *     tags: [Metas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da meta
 *     responses:
 *       200:
 *         description: Meta encontrada
 *       404:
 *         description: Meta não encontrada
 */
router.get('/:id', metaController.buscarPorId);

/**
 * @swagger
 * /api/metas/inserir:
 *   post:
 *     summary: Insere uma nova meta
 *     tags: [Metas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataMeta:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Meta criada com sucesso
 */
router.post('/inserir', metaController.inserir);

/**
 * @swagger
 * /api/metas/atualizar/{id}:
 *   put:
 *     summary: Atualiza uma meta pelo ID
 *     tags: [Metas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da meta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataMeta:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Meta atualizada com sucesso
 *       404:
 *         description: Meta não encontrada
 */
router.put('/atualizar/:id', metaController.atualizar);

/**
 * @swagger
 * /api/metas/deletar/{id}:
 *   delete:
 *     summary: Remove uma meta pelo ID
 *     tags: [Metas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da meta
 *     responses:
 *       200:
 *         description: Meta removida com sucesso
 *       404:
 *         description: Meta não encontrada
 */
router.delete('/deletar/:id', metaController.deletar);

module.exports = router;
