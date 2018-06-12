import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import { articleType } from './articleType';

export const rssType = new GraphQLObjectType({
  name: 'RSSResponse',
  description: 'RSS Response Object',
  fields: () => ({
    items: {
      type: GraphQLList(articleType),
      description: "List of items"
    },
    link: {
      type: GraphQLString,
      description: 'Link to the site'
    },
    feedUrl: {
      type: GraphQLString,
      description: 'Link to the feed'
    },
    title: {
      type: GraphQLString,
      description: 'Site title'
    }
  })
})