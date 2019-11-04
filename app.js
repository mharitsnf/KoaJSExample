const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const app = new Koa()

app.use(logger())

// Error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx) // Emit error...
    }
});
app.on('error', (err, ctx) => { // ... catch here
    console.log(err)
    console.log(ctx)
});


// Export routers
const router = new Router()
const dogRouter = new Router({
    prefix: '/dogs'
})
require('./routes/basic')({ router });
require('./routes/dogs')({ dogRouter });


// Start and configure server
app.use(router.routes())
app.use(router.allowedMethods())

app.use(dogRouter.routes())
app.use(dogRouter.allowedMethods())

const server = app.listen(3100)
module.exports = server