const { send } = require('../extras/responseParser')

module.exports = ({ router }) => {
    // Getting the home route
    router.get('/', (ctx, next) => {
        ctx.body = 'Hello World!'
    })

    // Example getting query
    // /query?id=12&name=hellow
    router.get('/query', (ctx, next) => {
        let query = ctx.query
        ctx.body = send(200, 'OK', query)
    })

    // Another example on query
    // return { page: ..., peepee: ... }
    router.get('/test/:page/untest/:peepee', (ctx, next) => {
        let params = ctx.params
        ctx.body = send(200, 'OK', params)
    })

    router.post('/send', (ctx, next) => {
        ctx.body = send(200, 'OK', ctx.request.body)
    })

    // Experimenting error
    router.get('/error', (ctx, next) => {
        ctx.throw(500, 'Cobain error')
    })
}