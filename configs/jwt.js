const jwt = require('koa-jwt');
const dotenv = require('dotenv');
dotenv.config()
// Configuration setup for jwt, such as defining secrets:
module.exports = jwt({
    secret: process.env.JWT_SECRET || 'defaulttokensecret'
})