import React, { Component } from 'react';
import './Source.css';

import SourceList from  './list/List';
import SourceSearch from './search/Search';
import SourceAdd from './add/Add';

export default class Source extends Component {
  render() {
    return (
      <div className="source row">
        <div className='col-4'>
          <SourceAdd />
        </div>
        <div className='col-4'>
          <SourceSearch />        
        </div>
        <div className='col-4'>
          <SourceList />        
        </div>                
      </div>
    )
  }
}
