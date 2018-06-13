import React, { Component } from 'react';
import './Item.css';

export default class Item extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='col-3 pb-2'>
        <div className="item card">
          <div className='card-body'>
            <h5 className='card-title'>
              <small>{ this.props.data.title }</small>
            </h5>
            <p><small>Source: {this.props.data.source}</small></p>
          </div>
        </div>      
      </div>
    )
  }
}
