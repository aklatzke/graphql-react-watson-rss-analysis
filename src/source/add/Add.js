import React, { Component } from 'react';
import { client, gqlTag } from "../../graphql";

let INSERT_MUTATION = gqlTag`
  mutation createFeed( $name: String!, $rss: String! ){
    createFeed( name: $name, rss: $rss ){
      _id,
      name,
      rss
    }
  }
`

export default class Add extends Component {
  constructor(props){
    super(props)

    this.state = {
      name : "",
      rss: ""
    }
  }

  updateRss = (e) => {
    this.setState({
      rss: e.target.value
    })
  }

  updateName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  submit = () => {
    if( this.state.rss && this.state.name ){
      client.mutate({
        mutation: INSERT_MUTATION,
        variables: { name: this.state.name, rss: this.state.rss }
      })
    }
  }

  render() {
    return (
      <div className="add row">
        <div className='col-5'>
          <input type="text" onChange={ this.updateRss } ref='rss-feed' placeholder='Enter RSS URL' className="form-control" />
        </div>
        <div className='col-5'>
          <input type='text' onChange={ this.updateName } ref='feed-name' placeholder="Enter site name" className="form-control" />        
        </div>
        <div className='col-2'>
          <input type='submit' onClick={ this.submit }className='btn btn-primary' value='Submit' />        
        </div>
      </div>
    )
  }
}