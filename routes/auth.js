module.exports = ({ authRouter }) => {
    // Login
    authRouter.post('/login', (ctx, next) => {
        ctx.body = 'Hello World!'
    })

    authRouter.get('/', (ctx, next) => {
        ctx.body = 'Hello World from auth!'
    })
}