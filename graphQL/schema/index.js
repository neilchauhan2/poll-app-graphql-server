const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
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
})

// Poll Type
const PollType = new GraphQLObjectType({
    name: "Vote",
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        nominations: {
            type: GraphQLList(NominationType)
        }
    })
});

// Root Query 