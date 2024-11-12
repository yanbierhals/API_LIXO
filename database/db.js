// const knex = require("knex")({
//     client : "pg",
//     connection : {
//         host : "localhost",
//         user : "postgres",
//         password : "1234",
//         database : "sistema_coleta"
//     }
// })

// module.exports = knex

const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false
    }
})

module.exports = {
    supabase
};