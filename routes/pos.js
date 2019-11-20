const db = require('../configs/db/database')
const { send } = require('../extras/responseParser')

module.exports = ({ posRouter }) => {
    
    // Using database example
    posRouter.get('/', async (ctx, next) => {
        try {
            let res = await db.select().from('pos');
            ctx.body = send(200, res)
        } catch (error) {
            ctx.throw(500, error)
        }
    })
}