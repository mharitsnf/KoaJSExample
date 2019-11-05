const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const app = new Koa()
const jwt = require('./configs/jwt')

const { errorMiddleware, errorLogger } = require('./handlers/error')

// This function is used to show logs on console
app.use(logger())

// Error handling
app.use(errorMiddleware);
app.on('error', errorLogger);

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

// Start and configure server
app.use(router.routes())
app.use(router.allowedMethods())

// Authentication using JWT
app.use(jwt) 

// Below here are authenticated routes
app.use(dogRouter.routes())
app.use(dogRouter.allowedMethods())

app.use(posRouter.routes())
app.use(posRouter.allowedMethods())

// Open port 3100 and congrats!
const server = app.listen(3100)
module.exports = server