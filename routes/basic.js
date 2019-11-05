module.exports = ({ router }) => {
    // Getting the home route
    router.get('/', (ctx, jwt, next) => {
        ctx.body = 'Hello World!'
    })

    // Experimenting error
    router.get('/error', (ctx, jwt, next) => {
        ctx.throw(500, 'Cobain error')
    })
}