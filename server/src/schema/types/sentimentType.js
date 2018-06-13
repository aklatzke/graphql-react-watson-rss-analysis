import { 
    GraphQLObjectType, 
    GraphQLFloat, 
    GraphQLList, 
    GraphQLString, 
    GraphQLInt
} from "graphql";

export const watsonToneType = new GraphQLObjectType({
    name: "WatsonToneType",
    fields: () => ({
        score: {
            type: GraphQLFloat
        },
        tone_id: {
            type: GraphQLString
        },
        tone_name: {
            type: GraphQLString
        }
    })
})

export const watsonResponseType = new GraphQLObjectType({
    name: "WatsonResponseType",
    fields: () => ({
        tone: {
            type: GraphQLList(watsonToneType)
        }
    })
})

export const assessmentType = new GraphQLObjectType({
    name: 'AssessmentItem',
    fields : () => ({
        keywords: {
            type: GraphQLList(GraphQLString)
        },
        polarity: {
            type: GraphQLFloat
        },
        subjectivity: {
            type: GraphQLFloat
        },
        occurences: {
            type: GraphQLInt
        }
    })

})

export const sentimentType = new GraphQLObjectType({
    name: 'SentimentAnalysis',
    fields : () => ({
        polarity: {
            type: GraphQLFloat
        },
        subjectivity: {
            type: GraphQLFloat
        },
        assessments: {
            type: GraphQLList(assessmentType)
        },
        tone: {
          type: GraphQLList(watsonToneType)
        }
    })
})