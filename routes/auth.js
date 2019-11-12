const jwt = require('jsonwebtoken')
const { send, fail } = require('../extras/responseParser')

module.exports = ({ authRouter }) => {
    // Login
    authRouter.post('/login', (ctx, next) => {
        let reqBody = ctx.request.body
        if (reqBody.username == 'user' && reqBody.password == 'password') {
            ctx.body = send(200, true, { token: jwt.sign({ username: reqBody.username }, 'hayo tebak secretnya apa') })
        } else {
            ctx.body = fail(400, false, "That didn't work. Try again!")
        }
    })

    authRouter.get('/', (ctx, next) => {
        ctx.body = 'Hello World from auth!'
    })
}