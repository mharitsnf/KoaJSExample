const {
    performance
  } = require('perf_hooks');

/**
 * Function for handling queries and mutation for GraphQL
 * Example request through body
 * 
 * @param {*} ctx 
 * @param {*} next 
 */
const graphQLHandler = async (ctx, next) => {
    try {
        var t1 = performance.now()
        
        let query = '{ '
        Object.entries(ctx.request.body).forEach(([key, val]) => {
            query += key + " "

            if (val.args !== undefined) {
                let args = val.args
                let arrArgs = []
                Object.entries(args).forEach(([key, val]) => {
                    arrArgs.push(`${key}: ${val}`)
                })
                query += "(" + arrArgs.join(", ") + ") "

            }

            if (val.fields !== undefined) {
                let fields = val.fields
                query += '{ '
                fields.forEach((val, index) => {
                    query += `${val} `
                })
                query += '} '
            }
        })

        query += '}'
        ctx.state.query = query

         // Measuring performance
        var t2 = performance.now()
        console.log(`performance: ${t2-t1} ms`)

        await next()
    } catch (error) {
        ctx.throw(500, error)
    }
}

module.exports = { graphQLHandler }