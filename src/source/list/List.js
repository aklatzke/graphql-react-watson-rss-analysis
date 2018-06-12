import React, { Component } from 'react';
import './List.css';

import ListItem from './item/Item';

export default class List extends Component {
  render() {
    return (
      <ul className='source-list list-group'>
        { this.props.sources.map( item => <ListItem key={item.name} item={ item } /> ) }
      </ul>
    )
  }
}
