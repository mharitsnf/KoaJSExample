const jwt = require('jsonwebtoken')
const { send } = require('../extras/responseParser')

module.exports = ({ authRouter }) => {
    // Login
    authRouter.post('/login', (ctx, next) => {
        let reqBody = ctx.request.body
        if (reqBody.username == 'user' && reqBody.password == 'password') {
            ctx.body = send(200, 'OK', { token: jwt.sign({ username: reqBody.username }, 'hayo tebak secretnya apa') })
        } else {
            ctx.body = send(400, 'Failed', "That didn't work. Try again!")
        }
    })

    authRouter.get('/', (ctx, next) => {
        ctx.body = 'Hello World from auth!'
    })
}