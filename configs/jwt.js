const jwt = require('koa-jwt');

// Configuration setup for jwt, such as defining secrets:
module.exports = jwt({
    secret: "hayo tebak secretnya apa"
})