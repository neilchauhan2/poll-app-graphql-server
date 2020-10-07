const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

// Nomination Type
const NominationType = new GraphQLObjectType({
    name: "Nomination",
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
});

// Poll Type
const PollType = new GraphQLObjectType({
    name: "Poll",
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        nominations: {
            type: GraphQLList(NominationType),
            resolve(parent, args) {}
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        poll: {
            type: PollType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {}
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});