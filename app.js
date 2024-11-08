const express = require('express')
const pontoColetaRouter = require('./router/pontoColeta_router')
const dicaRouter = require('./router/dica_router')
const usuarioRouter = require('./router/usuario_router')
const metaRouter = require('./router/meta_router')
const loginController = require('./controller/login_controller')
const authMiddleware = require('./middleware/auth_middleware')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(function (req, res, next) {
    console.log(req.method + " - " + req.originalUrl)
    next()
})

//API para testar se a URL está no ar (http://localhost:3000)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/login', loginController.realizarLogin)

app.use(authMiddleware.verificarAcesso)

app.use('/api/pontos_coleta', pontoColetaRouter)

app.use('api/dicas',dicaRouter)

app.use('/api/usuarios', usuarioRouter)

app.use('/api/metas', metaRouter)

app.listen(PORT, () => {
    console.log(`Servidor executando na porta: ${PORT}`)
})
