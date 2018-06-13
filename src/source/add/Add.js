import React, { Component } from 'react';
import { client, gqlTag } from "../../graphql";

let INSERT_MUTATION = gqlTag`
  mutation createFeed( $name: String!, $rss: String!, $image: String ){
    createFeed( name: $name, rss: $rss, image: $image ){
      _id,
      name,
      rss,
      image
    }
  }
`

export default class Add extends Component {
  constructor(props){
    super(props)

    this.state = {
      name : "",
      rss: "",
      image: ""
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

  updateImage = (e) => {
    this.setState({
      image: e.target.value
    })
  }

  submit = () => {
    if( this.state.rss && this.state.name ){
      client.mutate({
        mutation: INSERT_MUTATION,
        variables: { name: this.state.name, rss: this.state.rss, image: this.state.image }
      })
    }
  }

  render() {
    return (
      <div className="add form-row">
        <div className='col-6'>
          <input type="text" onChange={ this.updateRss } ref='rss-feed' placeholder='Enter RSS URL' className="form-control" />
        </div>
        <div className='col-6'>
          <input type='text' onChange={ this.updateName } ref='feed-name' placeholder="Enter site name" className="form-control" />        
        </div>
        <div className='col-6 mt-1'>
          <input type='text' onChange={ this.updateImage } ref='feed-image' placeholder="Enter Image URL" className='form-control' /> 
        </div>
        <div className='col-6 mt-1'>
          <input type='submit' onClick={ this.submit }className='btn btn-primary btn-block' value='Submit' />        
        </div>
      </div>
    )
  }
}