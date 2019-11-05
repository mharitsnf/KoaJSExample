const db = require('../database')
const { send } = require('../extras/responseParser')

module.exports = ({ posRouter }) => {
    
    posRouter.get('/', async (ctx, next) => {
        let res = await db.select().from('pos');
        ctx.body = send(200, 'OK', res)
    })
}