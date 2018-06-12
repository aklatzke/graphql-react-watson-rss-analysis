import React, { Component } from 'react';
import './Item.css';

import {client, gqlTag} from  '../../../graphql';

const SINGLE_FEED_QUERY = gqlTag`
    query rssFeed( $id: String! ){
        rssFeed( id: $id ){
            items{
                title,
                link,
                pubDate,
                author,
                content
            },
            link,
            feedUrl,
            title
        }
    }
`;

export default class Item extends Component {

  getFeed = ( id ) => {
      client.query({
          query: SINGLE_FEED_QUERY,
          variables: { id }
      })
  }

  render() {
    return (
      <li class='list-group-item' onClick={ () => this.getFeed(this.props.item._id) }>{ this.props.item.name }</li>
    )
  }
}
