import React, { Component } from 'react';
import './Source.css';

import { client, gqlTag } from '../graphql';

import SourceList from  './list/List';
import SourceSearch from './search/Search';
import SourceAdd from './add/Add';
import ArticleComparison from '../comparison/Comparison';

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
    sources: [],
    comparison: []
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

  addCompare = (article, source) => {
    article.source = source;

    this.setState({
      comparison: [...this.state.comparison, article]
    })
  }

  render() {
    return (
      <div className="source row pt-5">
        <div className='col-8'>
          <div className='row'>
            <div className='col-8'>
              <legend className='top-level-legend'>Add a New Feed Below</legend>
              <SourceAdd />
            </div>
            <div className='col-4'>
              <legend className='top-level-legend'>Find a Feed Below</legend>
              <SourceSearch addSource={ this.addSource }/>        
            </div>            
          </div>
          <div className='row'>
            <div className='col-12'>

              <ArticleComparison comparisonArticles={ this.state.comparison }/>
            </div>
          </div>
        </div>

        <div className='col-4'>
          <legend className='top-level-legend'>Current Feeds (Click to Expand)</legend>        
          <SourceList sources={ this.state.sources } addCompare={ this.addCompare }/>        
        </div>                
      </div>
    )
  }
}
