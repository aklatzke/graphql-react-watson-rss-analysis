import React, { Component } from 'react';
import './Moods.css';
import Plot from 'react-plotly.js';

export default class Moods extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      layout: {},
      data: {}
    }
  }
   
  componentDidMount(){
    this.generateGraph();
  }

  componentDidUpdate(oldProps){
    if( JSON.stringify(oldProps) !== JSON.stringify(this.props) ){
      this.generateGraph();
    }
  }

  generateGraph(){  
    let props = props || this.props;
    let dataArray = [];

    let thisTrace = {
      x: this.props.data.tone.map( mood => mood.tone_name ),
      y: this.props.data.tone.map( mood => mood.score ),
      type: "bar"
    }

    dataArray.push(thisTrace);

    this.setState({
      data: dataArray,
      layout: {
        width: 400,
        height: 300
      }
    })
  } 

  render() {
    return (
      <div className="moods col-6">
        <h6 class='moods-title'>
          { this.props.data.title }
        </h6>
        <Plot data={this.state.data} layout={this.state.layout} />
      </div>
    )
  }
}
