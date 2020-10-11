const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;
const {
    getPoll,
    createPoll
} = require("../../db/controllers/poll");
const {
    createNomination,
    upVote,
    downVote,
    getNominations
} = require("../../db/controllers/nomination");

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
            type: GraphQLInt
        },
        pollId: {
            type: new GraphQLNonNull(GraphQLString)
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
            resolve(parent, args) {
                return getNominations(parent.id);
            }
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
            resolve(parent, args) {
                return getPoll(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPoll: {
            type: PollType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                return createPoll({
                    name: args.name
                });
            }
        },
        addNomination: {
            type: NominationType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                pollId: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                return createNomination({
                    name: args.name,
                    pollId: args.pollId
                })
            }
        },
        addVote: {
            type: NominationType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                return upVote(args.id);
            }
        },
        removeVote: {
            type: NominationType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                return downVote(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});