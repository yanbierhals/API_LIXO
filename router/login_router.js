const express = require('express');
const router = express.Router();
const loginController = require('../controller/login_controller');  // Controller de autenticação

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Endpoint para autenticação de usuários
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Requisição mal formada
 */
router.post('login', loginController.realizarLogin);

module.exports = router;
