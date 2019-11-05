const db = require('../database')

module.exports = ({ posRouter }) => {
    
    posRouter.get('/', async (ctx, next) => {
        let res = await db.select().from('pos');
        ctx.body = JSON.stringify(res);
    })
}