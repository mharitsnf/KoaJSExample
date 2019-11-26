const db = require('../configs/db/database')
const { send, sendGQL } = require('../extras/responseParser')
const { graphql } = require('graphql')
const { schema } = require('../configs/db/schemas/users')

module.exports = ({ usersRouter }) => {
    
    // Using database example
    usersRouter.get('/', async (ctx, next) => {
        try {
            let res = await graphql(schema, ctx.state.query)
            ctx.body = sendGQL(200, res)
        } catch (error) {
            ctx.throw(500, error)
        }
    })
}