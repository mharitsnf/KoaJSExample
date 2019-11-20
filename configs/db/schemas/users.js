const db = require('../database')
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql')

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        idPrivilegeLevel: { type: GraphQLID },
        idSatuanKerja: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        lastLogin: { type: GraphQLString },
        createdBy: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedBy: { type: GraphQLID },
        updatedAt: { type: GraphQLString },
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: GraphQLList(UserType),
                resolve: async (root, args, context, info) => {
                    return await db.select().from('users')
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