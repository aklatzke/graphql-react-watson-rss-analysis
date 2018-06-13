import React, { Component } from 'react';
import './List.css';

import ListItem from './item/Item';

export default class List extends Component {
  render() {
    return (
      <div className='source-list'>
        { this.props.sources.length ? '' : '(none added)' }
        { this.props.sources.map( item => <ListItem key={item.name} item={ item } addCompare={ this.props.addCompare } /> ) }
      </div>
    )
  }
}
