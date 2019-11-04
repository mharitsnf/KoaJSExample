module.exports = ({ router }) => {
    
    // Getting the home route
    router.get('/', (ctx, next) => {
        ctx.body = 'Hello World!'
    })

    // Experimenting error
    router.get('/error', (ctx, next) => {
        ctx.throw(500, 'Cobain error')
    })
}