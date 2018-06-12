import React, { Component } from 'react';
import './Search.css';
import Autocomplete from 'react-autocomplete';

import { client, gqlTag } from '../../graphql';

let ALL_QUERY = gqlTag`{
  allFeeds{
    _id,
    name,
    rss
  }
}`;  

export default class Search extends Component {
  state = {
    items: [],
    inputValue : ''
  }

  componentDidMount(){
    client.query({
      query: ALL_QUERY
    })
    .then(data => {
      this.setState({
        items: data.data.allFeeds
      })
    })
  }

  onSearchSelect = (value) => {
    this.props.addSource(value);
    this.setState({
      inputValue: ''
    })
  }

  maybeRenderAutocomplete(){
    if( this.state.items.length ){
      return <Autocomplete 
              items={ this.state.items }
              getItemValue={ (item) => item._id }
              renderItem={ item => <div>{ item.name }</div> }
              onSelect={ this.onSearchSelect }
              shouldItemRender={ (item, value) => item.name.toLowerCase().includes(value.toLowerCase()) }
              value={ this.state.inputValue }
              onChange={ e => this.setState({ inputValue: e.target.value }) }
              renderInput={ props => <input className='form-control' {...props} /> }
            />
    }
  }

  render() {
    return (
      <div className="search">
        { this.maybeRenderAutocomplete() }
      </div>
    )
  }
}
