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
    state = {
        feedItems : [],
        feedIsVisible : false
    }

  componentDidMount(){
      const id = this.props.item._id;

      client.query({
          query: SINGLE_FEED_QUERY,
          variables: { id }
      })
      .then(response => {
          this.setState({
              feedItems: response.data.rssFeed.items
          })
      })      
  }

  toggleFeed = ( id ) => {
    this.setState({
        feedIsVisible: ! this.state.feedIsVisible
    })
  }

  maybeRenderFeed = () => {
      if( this.state.feedItems.length && this.state.feedIsVisible ){
          return (
              <ul className='list-group'>
                { this.state.feedItems.map( item => (
                    <li onClick={() => this.props.addCompare(item, this.props.item.name)} class='list-group-item'>{ item.title }</li>
                ) ) }
              </ul>
          )
      }
  }

  render() {
    return (
      <div class='card mb-2'>
        <div className='card-body'>
            <h5 onClick={ () => this.toggleFeed() }className='card-title'>{ this.props.item.name } { this.state.feedIsVisible ? <small>(collapse)</small> : <small>(expand)</small> }</h5>
            { this.maybeRenderFeed() }
        </div>
      </div>
    )
  }
}
