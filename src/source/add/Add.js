import React, { Component } from 'react';


export default class Add extends Component {
  constructor(props){
    super(props)

    console.log(props)
  }

  updateRss = (e) => {
    console.log(this.getState())
  }

  updateName = (e) => {
    console.log(this.getState())
  }

  render() {
    return (
      <div className="add">
        <input type="text" onChange={ this.updateRss } ref='rss-feed' placeholder='Enter RSS URL' className="form-control" />
        <input type='text' onChange={ this.updateName } ref='feed-name' placeholder="Enter site name" className="form-control" />
        <input type='submit' className='btn btn-primary' value='Submit' />
      </div>
    )
  }
}