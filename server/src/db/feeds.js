import db from './connection';
import RSS from 'rss-parser';
import emotional from 'emotional';
import striptags from 'striptags';
import Promise from 'promise';
import Analyzer from '../watson';

let RSSReader = new RSS();
let feeds = db.feed;


const emotionalPromise = new Promise((resolve) => {
    emotional.load(function(){
        resolve();
    })
})

export default {
    findAll: () => feeds.find(),

    findOne: (id) => feeds.findOne({ _id:  db.ObjectId(id) }),

    insert: ({ name, rss, image }) => feeds.insert({ name, rss, image }),

    getRSS(id){
        return this.findOne(id)
                    .then( data => RSSReader.parseURL(data.rss + "?n=200") )
    },

    analyze : (contents) => {
        contents = contents.map( string => striptags(string) )

         let watsonPromises = contents.map(string => {
           return new Promise((resolve, reject) => {
             let params = {
               'tone_input': {
                 text: string
               },
               'content_type': 'application/json'
             };

             Analyzer.tone(params, function (err, analysis) {
               if (err)
                 reject(err);
               else
                 resolve(analysis);
             })
           })
         })

        return emotionalPromise.then( () => Promise.all( watsonPromises ))
                .then( watsonResponse => {
                    contents = contents.map((str, idx) => ({ tone: watsonResponse[idx].document_tone.tones, ...emotional.get(str) }))

                    contents.forEach(item => {
                        let occurenceMap = {};
                        item.assessments = item.assessments.map(arr => {
                            if (!occurenceMap[arr[0].toString()])
                                occurenceMap[arr[0].toString()] = 1;
                            else
                                occurenceMap[arr[0].toString()]++;

                            return {
                                keywords: arr[0],
                                polarity: arr[1],
                                subjectivity: arr[2]
                            }
                        })

                        item.assessments = item.assessments
                            .map(item => {
                            if (occurenceMap[item.keywords.toString()]) {
                                let occurenceCount = occurenceMap[item.keywords.toString()]
                                delete occurenceMap[item.keywords.toString()]
                                return { ...item,
                                occurences: occurenceCount
                                }
                            } else
                                return false;
                            })
                            .filter(item => item)
                            .sort((a, b) => a.occurences > b.occurences)
                            .reverse();
                    })

                    return contents;
                });
    }
}