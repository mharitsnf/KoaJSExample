const dotenv = require('dotenv')
const knexfile = require('./knexfile')
dotenv.config()

// Query builder using knex. Setup database connection here:
const knex = require('knex')(knexfile.development)

module.exports = knex;