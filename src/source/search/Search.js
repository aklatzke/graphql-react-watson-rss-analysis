import React, { Component } from 'react';
import './Search.css';
import Autocomplete from 'react-autocomplete';

import { client, gqlTag } from '../../graphql';

let ALL_QUERY = gqlTag`{ 
  allFeeds{
    _id,
    name,
    rss,
    image
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
              renderItem={ item => <div className='search-item'>{ item.name }</div> }
              onSelect={ this.onSearchSelect }
              shouldItemRender={ (item, value) => item.name.toLowerCase().includes(value.toLowerCase()) }
              value={ this.state.inputValue }
              onChange={ e => this.setState({ inputValue: e.target.value }) }
              renderInput={ props => <input placeholder="Select a Feed" className='form-control' {...props} /> }
              wrapperStyle={{
                position: "relative"
              }}
              menuStyle={{
                position: "absolute",
                zIndex: "999",
                left: 0,
                top: "100%",
                border: "1px solid #cdcdcd",
                borderTop: 0,
                borderRadius: "0px 0px 4px 4px",
                backgroundColor: "white",
                paddingTop: "8px",
                paddingBottom: "8px"
              }}
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
