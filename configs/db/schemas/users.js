const db = require('../database')
const {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
} = require('graphql')
const UserType = require('../types')
const OrderInput = require('../inputs')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: GraphQLList(UserType),
                args: {
                    order: { type: GraphQLList(OrderInput) }
                },
                resolve: async (root, args, context, info) => {
                    let query = db.select().from('users')

                    // Loop for ordering
                    if (args.order !== undefined) {
                        args.order.forEach(element => {
                            query.orderBy(element.column, element.dir)
                        });
                    }

                    return await query
                }
            },
            user: {
                type: UserType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: async (root, args, context, info) => {
                    return await db.select().from('users').where('id', args.id).first()
                }
            }
        }
    })
})

module.exports = { schema }