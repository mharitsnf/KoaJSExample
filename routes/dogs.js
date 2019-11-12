const request = require('superagent');
const { send } = require('../extras/responseParser')

module.exports = ({ dogRouter }) => {
    // Getting dogs route
    dogRouter.get('/', async (ctx, next) => {
        try {
            let response = await request.get('https://dog.ceo/api/breeds/list/all')
            ctx.body = send(200, true, response.body.message)
        } catch (error) {
            console.log(error)
        }
    })
}