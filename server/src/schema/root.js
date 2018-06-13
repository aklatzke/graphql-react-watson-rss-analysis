import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import { feedType } from './types/feedType';
import { articleType } from './types/articleType';
import { rssType } from './types/rssType';

import { 
    sentimentType, 
    assessmentType, 
    watsonToneType, 
    watsonResponseType 
} from './types/sentimentType';

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
                },
                image: {
                    type: GraphQLString
                }
            },
            resolve : ( root, { name, rss, image } ) => {
                if( name && rss ){
                    return feeds.insert( { name, rss, image } )
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
        },

        analyze : {
            type: GraphQLList(sentimentType),
            args: {
                contents : {
                    type: GraphQLList(GraphQLString),
                    description: "Content to analyze"
                }
            },
            resolve: (root, { contents }) => feeds.analyze(contents)
        }
    })
})

export default new GraphQLSchema({
    query: queryType,
    mutation: feedMutations,
    types: [
        articleType, 
        assessmentType,
        feedType, 
        rssType, 
        sentimentType, 
        watsonResponseType,
        watsonToneType
    ]
})