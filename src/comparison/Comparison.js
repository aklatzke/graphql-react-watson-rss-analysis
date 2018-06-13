import React, { Component } from 'react';
import './Comparison.css';
import Item from './item/Item';
import Graph from './graph/Graph';
import Options from './options/Options';
import MoodList from './moods/List';

import { client, gqlTag } from '../graphql';

const ANALYZE_QUERY = gqlTag`
  query analyze( $contents: [String!] ){
    analyze( contents: $contents ){
      polarity,
      subjectivity,
      assessments{
        keywords,
        polarity,
        subjectivity,
        occurences
      },
      tone{
        score,
        tone_id,
        tone_name
      }
    }
  }
`;  

export default class Comparison extends Component {
  state = {
    output: null,
    graphSort : "default"
  } 

  maybeRenderItems(){
    if( this.props.comparisonArticles.length ){
      return this.props.comparisonArticles.map( item => (
        <Item key={item.title} data={ item } addCompare={ this.props.addCompare }></Item>
      ) )
    }
  }

  maybeRenderAnalyze(){
    if( this.props.comparisonArticles.length ){
      return <div className='col-12'>
              <button className='btn btn-outline-secondary btn-block' onClick={ this.runAnalyze }>Analyze</button>
             </div>
    }
  }

  maybeRenderOutput(){
    if( this.state.output ){
      return (
        <div>
          <Options 
            groupDefault={ () => this.setState({ graphSort: "default" }) } 
            groupBySource={ () => this.setState({ graphSort: "source" }) }
          />
          <Graph data={ this.state.output } groupBy={this.state.graphSort} />
          <MoodList data={ this.state.output } groupBy={this.state.graphSort} />
        </div>
      ) 
    }
  }

  runAnalyze = () => {
    client.query({ 
      query: ANALYZE_QUERY,
      variables: {
        contents: this.props.comparisonArticles.map( item => item.content )
      }
    })
    .then(data => {
        let outputData = data.data.analyze;

        outputData = outputData.map( ( item, idx ) => {
          let thisArticle = this.props.comparisonArticles[idx];
          
          item.author = thisArticle.author;
          item.source = thisArticle.source;
          item.title = thisArticle.title;

          return item;
        } )

      return this.setState({
        output: outputData
      })
    })
  }

  render() {
    return (
      <div className="comparison pt-4">
        <div className='row'>
          <p className='col-12 comparison-heading'>Articles For Comparison:</p>
          { this.props.comparisonArticles.length ? '' : '(none added)' }
          { this.maybeRenderItems() }     
          { this.maybeRenderAnalyze() }   
          { this.maybeRenderOutput() }
        </div>
      </div>
    )
  }
}
