const redisClient = require('async-redis').createClient({ host: 'redis' })
const jwt = require('jsonwebtoken')

// Authentication using redis (as a token revoking measure)
const redis = async (ctx, next) => {
    try {
        let token = ctx.header.authorization.split(' ')[1]
        let decoded = jwt.decode(token)

        let redisToken = await redisClient.get(decoded.username)

        if (token != redisToken) {
            ctx.throw(401, 'Authentication error')
        }

        await next()
    } catch (error) {
        ctx.throw(500, error)        
    }    
}

// Storing to redis
const storeRedis = async (key, value) => {
    try {
        redisClient.set(key, value)
    } catch (error) {
        throw error
    }
}

module.exports = { redis, storeRedis }