const { send } = require('./responseParser')

// The actual error handler
const errorMiddleware = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = send(err.status, 'Failed', err.message)
        ctx.app.emit('error', err, ctx) // Emit error...
    }
}

// Function to process upon catching 'error'
const errorLogger = async (err, ctx) => {  // ... catch here
    console.log(err)
    console.log(ctx)
}

module.exports = { errorMiddleware, errorLogger }