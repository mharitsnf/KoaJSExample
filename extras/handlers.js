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

const graphQLHandlerExample = async (ctx, next) => {
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

const graphQLHandler = async (ctx, next) => {
    try {
        let query = '{ '

        query += ctx.request.body.query + " "

        if (ctx.request.body.args !== undefined) {
            let args = ctx.request.body.args
            let arrArgs = []
            Object.entries(args).forEach(([key, val]) => {
                arrArgs.push(`${key}: ${val}`)
            })
            query += "(" + arrArgs.join(", ") + ") "

        }

        if (ctx.request.body.fields !== undefined) {
            let fields = ctx.request.body.fields
            query += '{ '
            fields.forEach((val, index) => {
                query += `${val} `
            })
            query += '}'
        }

        query += '}'
        ctx.state.query = query
        await next()
    } catch (error) {
        ctx.throw(500, error)
    }
}

module.exports = { graphQLHandlerExample, graphQLHandler }