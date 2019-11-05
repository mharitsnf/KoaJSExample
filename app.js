const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const app = new Koa()
const jwt = require('./configs/jwt')
const bodyParser = require('koa-bodyparser')

const { errorMiddleware, errorLogger } = require('./extras/error')

// This function is used to show logs on console
app.use(logger())
app.use(bodyParser())

// Error handling
app.use(errorMiddleware);
// app.on('error', errorLogger);

// Export routers
const router = new Router()
require('./routes/basic')({ router });

const dogRouter = new Router({
    prefix: '/dogs'
})
require('./routes/dogs')({ dogRouter });

const posRouter = new Router({
    prefix: '/pos'
})
require('./routes/pos')({ posRouter });

const authRouter = new Router({
    prefix: '/auth'
})
require('./routes/auth')({ authRouter })

const apiRouter = new Router()
apiRouter.use('/api', posRouter.routes(), posRouter.allowedMethods())
apiRouter.use('/api', dogRouter.routes(), dogRouter.allowedMethods())

// Start and configure server
app.use(router.routes())
app.use(router.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

// Authentication using JWT
app.use(jwt) 

// Below here are authenticated routes
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())


// Open port 3100 and congrats!
const server = app.listen(3100)
module.exports = server