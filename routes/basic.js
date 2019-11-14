const { send, fail } = require('../extras/responseParser')

module.exports = ({ router }) => {
    // Getting the home route
    router.get('/', async (ctx, next) => {
        try {
            // console.log('request: ' + JSON.stringify(ctx.headers))
            ctx.body = 'Hello World!'
        } catch (error) {
            ctx.throw(500, error)
        }
    })

    // Example getting query
    // /query?id=12&name=hellow
    router.get('/query', async (ctx, next) => {
        try {
            let query = ctx.query
            ctx.body = send(200, query)                
        } catch (error) {
            ctx.throw(500, error)            
        }
    })

    // Another example on query
    // return { page: ..., peepee: ... }
    router.get('/test/:page/untest/:peepee', async (ctx, next) => {
        try {
            let params = ctx.params
            ctx.body = send(200, params)                
        } catch (error) {
            ctx.throw(500, error)
        }
    })

    router.post('/send', async (ctx, next) => {
        try {
            ctx.body = send(200, ctx.request.body)            
        } catch (error) {
            ctx.throw(500, error)
        }
    })

    // Experimenting error
    router.get('/error', (ctx, next) => {
        ctx.throw(500, 'Cobain error')
    })
}