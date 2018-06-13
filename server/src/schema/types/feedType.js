import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

export const feedType = new GraphQLObjectType({
  name: 'Feeds',
  description: 'Represents a single feed.',
  fields: () => ({
    _id: {
      type: GraphQLString,
      description: 'The ObjectId'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the website.'
    },
    rss: {
      type: GraphQLString,
      description: 'Endpoint for the RSS feed.'
    },
    image: {
      type: GraphQLString,
      description: "Link to image"
    }
  })
})