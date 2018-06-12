import db from './connection';
import RSS from 'rss-parser';

let RSSReader = new RSS();

let feeds = db.feed;

export default {
    findAll: () => feeds.find(),

    findOne: (id) => feeds.findOne({ _id:  db.ObjectId(id) }),

    insert: ({ name, rss }) => feeds.insert({ name, rss }),

    getRSS(id){
        return this.findOne(id)
                    .then( data => RSSReader.parseURL(data.rss + "?n=200") )
    }
}