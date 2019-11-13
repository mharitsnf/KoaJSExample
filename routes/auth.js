const jwt = require('jsonwebtoken')
const { send, fail } = require('../extras/responseParser')

module.exports = ({ authRouter }) => {
    // Login
    authRouter.post('/login', async (ctx, next) => {
        try {
            let reqBody = ctx.request.body
            if (reqBody.username == 'user' && reqBody.password == 'password') {
                ctx.body = send(200, { token: jwt.sign({ username: reqBody.username }, 'hayo tebak secretnya apa') })
            } else {
                ctx.body = fail(400, "That didn't work. Try again!")
            }
        } catch (error) {
            ctx.throw(500, error)
        }
    })

    authRouter.get('/', async (ctx, next) => {
        try {
            ctx.body = 'Hello World from auth!'            
        } catch (error) {     
            ctx.throw(500, error)
        }
    })
}