const jwt = require('jsonwebtoken')
const { storeRedis, deleteRedis, existsRedis, getRedis } = require('../configs/redis')
const { send, fail } = require('../extras/responseParser')
const dotenv = require('dotenv')
dotenv.config()

module.exports = ({ authRouter }) => {
    // Login
    authRouter.post('/login', async (ctx, next) => {
        try {
            let reqBody = ctx.request.body

            if (reqBody.username == 'user' && reqBody.password == 'password') {
                let token = jwt.sign({ username: reqBody.username }, process.env.JWT_SECRET || 'defaulttokensecret')
                storeRedis(reqBody.username, token)

                ctx.body = send(200, { token: token })

            } else {
                ctx.body = fail(400, "That didn't work. Try again!")

            }

        } catch (error) {
            ctx.throw(500, error)
        }
    })

    authRouter.post('/logout', async (ctx, next) => {
        try {
            let reqBody = ctx.request.body
            let verifyResult = jwt.verify(reqBody.token, process.env.JWT_SECRET || 'defaulttokensecret')

            // Check if token payload same with the data sent
            if (verifyResult.username != reqBody.username) {
                ctx.throw(401, 'Authentication error')
            }

            if (await existsRedis(reqBody.username) != 1) {
                ctx.throw(401, 'Authentication error')
            }

            let tokenInRedis = await getRedis(reqBody.username)
            if (tokenInRedis != reqBody.token) {
                ctx.throw(401, 'Authentication error')
            }

            await deleteRedis(reqBody.username)

            ctx.body = send(200, 'Successful')

        } catch (error) {
            switch (error.name) {
                case 'JsonWebTokenError':
                    ctx.throw(401, error)

                default:
                    ctx.throw(500, error)
            }
        }
    })

    // authRouter.get('/', async (ctx, next) => {
    //     try {
    //         ctx.body = 'Hello World from auth!'            
    //     } catch (error) {     
    //         ctx.throw(500, error)
    //     }
    // })
}