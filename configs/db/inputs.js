const {
    GraphQLString,
    GraphQLInputObjectType
} = require('graphql')

const OrderInput = new GraphQLInputObjectType({
    name: "Order",
    fields: {
        column: { type: GraphQLString },
        dir: { type: GraphQLString }
    }
})

module.exports = OrderInput