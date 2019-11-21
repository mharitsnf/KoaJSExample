const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
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

module.exports = UserType