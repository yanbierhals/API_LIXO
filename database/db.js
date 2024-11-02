const knex = require("knex")({
    client : "pg",
    connection : {
        host : "localhost",
        user : "postgres",
        password : "1234",
        database : "sistema_coleta"
    }
})

module.exports = knex