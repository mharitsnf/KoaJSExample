// Query builder using knex. Setup database connection here:
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'jne.terralogiq.net',
        user: 'root',
        password: 'terra321!',
        database: 'jne-temp'
    }
})

module.exports = knex;