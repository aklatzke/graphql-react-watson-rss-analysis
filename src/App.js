import React, { Component } from 'react';
import './App.css';

import Source from './source/Source';

export default class App extends Component {
  sourceAction(event){
    
  }

  render() {
    return (
      <div className="App container-fluid">
        <header className="App-header row">
          <h1 className="App-title col-12">News Sentiment/Emotional Analysis</h1>
        </header>
        <Source />
      </div>
    );
  }
}
