const express = require('express')
const router = express.Router()
const pontoColetaController = require('../controller/pontoColeta_controller')

/**
 * @swagger
 * tags:
 *   name: Pontos de Coleta
 *   description: Gerenciamento de pontos de coleta
 */


/**
 * @swagger
 * /api/pontos-coleta:
 *   get:
 *     summary: Busca pontos de coleta com filtros baseados em parâmetros de consulta (Query Params)
 *     tags: [Pontos de Coleta]
 *     parameters:
 *       - in: query
 *         name: tipoLixo
 *         description: Tipo de lixo para filtrar os pontos de coleta
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: bairro
 *         description: Bairro para filtrar os pontos de coleta
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pontos de coleta encontrados com base nos filtros
 */
router.get('/', pontoColetaController.buscar);

/**
 * @swagger
 * /api/pontos-coleta/inserir:
 *   post:
 *     summary: Insere um novo ponto de coleta
 *     tags: [Pontos de Coleta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *               tipoLixo:
 *                 type: string
 *               bairro:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ponto de coleta criado com sucesso
 */
router.post('/inserir', pontoColetaController.inserir);

/**
 * @swagger
 * /api/pontos-coleta/atualizar/{id}:
 *   put:
 *     summary: Atualiza um ponto de coleta pelo ID
 *     tags: [Pontos de Coleta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ponto de coleta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *               tipoLixo:
 *                 type: string
 *               bairro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ponto de coleta atualizado com sucesso
 *       404:
 *         description: Ponto de coleta não encontrado
 */
router.put('/atualizar/:id', pontoColetaController.atualizar);

/**
 * @swagger
 * /api/pontos-coleta/deletar/{id}:
 *   delete:
 *     summary: Remove um ponto de coleta pelo ID
 *     tags: [Pontos de Coleta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ponto de coleta
 *     responses:
 *       200:
 *         description: Ponto de coleta removido com sucesso
 *       404:
 *         description: Ponto de coleta não encontrado
 */
router.delete('/deletar/:id', pontoColetaController.deletar);

module.exports = router;
