const fetch = require('node-fetch');
const { send } = require('../extras/responseParser')

module.exports = ({ dogRouter }) => {
    
    // Getting dogs route
    dogRouter.get('/', async (ctx, next) => {
        try {
            let response = await fetch('https://dog.ceo/api/breeds/list/all')
            let responseJson = await response.json()
            ctx.body = send(200, responseJson.message)
        } catch (error) {
            ctx.throw(500, error)
        }
    })
}