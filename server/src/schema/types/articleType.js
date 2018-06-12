import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

export const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'RSS Response Article',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'Article Title'
    },
    link: {
      type: GraphQLString,
      description: "Article Link"
    },
    pubDate: {
      type: GraphQLString,
      description: "Publication Date"
    },
    author: {
      type: GraphQLString,
      description: "Article Author"
    },
    content: {
      type: GraphQLString,
      description: "Article Content"
    }
  })
})