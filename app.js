const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const app = new Koa()
const jwt = require('./configs/jwt')
const { redis } = require('./configs/redis')
const bodyParser = require('koa-bodyparser')
const { errorMiddleware, errorLogger } = require('./extras/error')
const { graphQLHandler } = require('./extras/handlers')

// This function is used to show logs on console
app.use(logger())
app.use(bodyParser())

// Error handling
app.use(errorMiddleware);
// app.on('error', errorLogger);

// Export routers
// SAMPLE BASIC ROUTERS
const router = new Router()
require('./routes/basic')({ router });

// SAMPLE DOGS ROUTER
const dogRouter = new Router({
    prefix: '/dogs'
})
require('./routes/dogs')({ dogRouter });

// SAMPLE POS ROUTER
const posRouter = new Router({
    prefix: '/pos'
})
require('./routes/pos')({ posRouter });

// SAMPLE POS ROUTER
const usersRouter = new Router({
    prefix: '/users'
})
require('./routes/users')({ usersRouter });

// AUTH ROUTER
const authRouter = new Router({
    prefix: '/auth'
})
require('./routes/auth')({ authRouter })

// SECURED CONTROLLER
const apiRouter = new Router()
apiRouter.use('/api', posRouter.routes(), posRouter.allowedMethods())
apiRouter.use('/api', dogRouter.routes(), dogRouter.allowedMethods())
apiRouter.use('/api', usersRouter.routes(), usersRouter.allowedMethods())

// Start and configure server
app.use(router.routes())
app.use(router.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

// Authentication using JWT and Redis
app.use(jwt)
app.use(redis)
app.use(graphQLHandler)

// Below here are authenticated routes
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())


// Open port 8080 and congrats!
const server = app.listen(process.env.PORT || 8080)
module.exports = server