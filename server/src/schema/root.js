import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({})
})