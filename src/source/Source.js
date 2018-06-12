import React, { Component } from 'react';
import './Source.css';

import { client, gqlTag } from '../graphql';

import SourceList from  './list/List';
import SourceSearch from './search/Search';
import SourceAdd from './add/Add';

const SINGLE_FEED_QUERY = gqlTag`
  query feed( $id : String! ){
    feed( id: $id ){
      _id,
      rss,
      name
    }
  }
`

export default class Source extends Component {
  state = {
    sources: []
  }

  addSource = (_id) => {
    client.query({
      query: SINGLE_FEED_QUERY,
      variables : {
        id: _id
      }
    })
    .then( data => this.setState({
      sources: [ ...this.state.sources, data.data.feed ]
    }) )
  }

  render() {
    return (
      <div className="source row pt-5">
        <div className='col-4'>
          <SourceAdd />
        </div>
        <div className='col-4'>
          <SourceSearch addSource={ this.addSource }/>        
        </div>
        <div className='col-4'>
          <SourceList sources={ this.state.sources }/>        
        </div>                
      </div>
    )
  }
}
