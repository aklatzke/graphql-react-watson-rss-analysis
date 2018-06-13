import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class Graph extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      layout : {},
      data : {}
    }
  }

  componentDidMount(){
    this.generateGraphData();
  }

  componentDidUpdate(prevProps){
    if( prevProps.data.length !== this.props.data.length || prevProps.groupBy !== this.props.groupBy){
      this.generateGraphData()
    }
  }

  generateGraphData(props){
    props = props || this.props;
    let dataArray = [];

    if( props.groupBy === "default" ){
      this.props.data.forEach(item => {
        let thisTrace = {
          x: ['Polarity', 'Subjectivity'],
          y: [item['polarity'], item['subjectivity']],
          type: 'scatter',
          mode: 'lines+points',
          name: item.title.substr(0, 15) + "..."
        };

        dataArray.push(thisTrace);
      })
    }
    else if( props.groupBy === "source" ){
      let groups = {};

      this.props.data.forEach(item => {
        if( ! groups[item.source] ){
          groups[item.source] = [];
        } 

        groups[item.source].push(item);
      })

      Object.keys(groups).forEach(key => {
        let group = groups[key];
        let polarity = group.reduce( (carry, next) => carry + next.polarity, 0 );
        let subjectivity = group.reduce( (carry, next ) => carry + next.subjectivity, 0 );

        polarity = polarity/group.length
        subjectivity = subjectivity/group.length;
        dataArray.push({
          x: ['Polarity', 'Subjectivity'],
          y: [polarity, subjectivity],
          type: 'scatter',
          mode: 'lines+points',
          name: key
        })
      })
    }

    this.setState({
      data : dataArray,
      layout : {
        width: 900,
        height: 350,
        title: "Analysis"
      }
    })
  }

  render() {
    return (
      <div className="graph col-12">
        <Plot key={ this.state.data.length } data={this.state.data} layout={this.state.layout} />
      </div>
    )
  }
}
