const request = require('superagent');

module.exports = ({ dogRouter }) => {
    // Getting dogs route
    dogRouter.get('/', async (ctx, next) => {
        try {
            let response = await request.get('https://dog.ceo/api/breeds/list/all')
            ctx.body = response.body
        } catch (error) {
            console.log(error)
        }
    })
}