import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';

import { feedType } from './types/feedType';
import { articleType } from './types/articleType';
import { rssType } from './types/rssType';

import feeds from '../db/feeds';

const feedMutations = new GraphQLObjectType({
    name: "FeedMutations",
    fields : () => ({
        createFeed: {
            type: feedType,
            args: {
                name : {
                    type: GraphQLString
                },
                rss: {
                    type: GraphQLString
                }
            },
            resolve : ( root, { name, rss } ) => {
                if( name && rss ){
                    return feeds.insert( { name, rss } )
                }
            }
        }
    })
})

const queryType = new GraphQLObjectType({
    name : 'Query',
    fields: () => ({
        allFeeds: {
            type: GraphQLList(feedType),
            resolve: () => feeds.findAll()
        },

        feed: {
            type: feedType,
            args: {
                id: {
                    type: GraphQLString,
                    description: "Id of the object to fetch"
                }
            },
            resolve: (root, { id }) => feeds.findOne(id)
        },
        
        rssFeed : {
            type: rssType,
            args : {
                id: {
                    type: GraphQLString,
                    description: "ID of the feed to fetch"
                }
            },
            resolve: (root, { id }) => feeds.getRSS( id )
        }
    })
})

export default new GraphQLSchema({
    query: queryType,
    mutation: feedMutations,
    types: [feedType, rssType, articleType]
})