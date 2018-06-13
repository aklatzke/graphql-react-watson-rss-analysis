import React, { Component } from 'react';
import Moods from './Moods';

export default class List extends Component {
  renderGroups(){
    if( this.props.groupBy === 'default'){
      return this.props.data.map( item => <Moods data={item} /> )
    }
    else{}
  }

  render() {
    return (
      <div className="mood-list row">
        {this.renderGroups()}
      </div>
    )
  }
}
