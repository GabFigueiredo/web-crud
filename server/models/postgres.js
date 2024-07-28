const { Pool } = require("pg")
require('dotenv').config()

const ConnectionString = process.env.CONNECTION_STRING

module.exports = new Pool({
    connectionString: ConnectionString
})