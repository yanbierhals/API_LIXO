const express = require('express');
const pontoColetaRouter = require('./router/pontoColeta_router');
const dicaRouter = require('./router/dica_router');
const usuarioRouter = require('./router/usuario_router');
const metaRouter = require('./router/meta_router');
const loginController = require('./controller/login_controller');
const authMiddleware = require('./middleware/auth_middleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API LIXO',
      version: '1.0.0',
      description: 'Documentação da API LIXO',
    },
  },
  apis: ['./router/*.js'], // Caminho para os seus arquivos de rota
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//API para testar se a URL está no ar (http://localhost:3000)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/login', loginController.realizarLogin);

// Rota para autenticação: essa rota precisa de autenticação
app.use(authMiddleware.verificarAcesso);

// Rotas da API
app.use('/api/pontos_coleta', pontoColetaRouter);
app.use('/api/dicas', dicaRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/metas', metaRouter);

app.listen(PORT, () => {
  console.log(`Servidor executando na porta: ${PORT}`);
});
