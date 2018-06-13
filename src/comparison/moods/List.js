import React, { Component } from 'react';
import Moods from './Moods';

export default class List extends Component {
  renderGroups(){
    if( this.props.groupBy === 'default'){
      return this.props.data.map( item => <Moods data={item} /> )
    }
    else{
      let groups = {};

      this.props.data.forEach( story => {
        if( ! groups[story.source] )
          groups[story.source] = [];

        groups[story.source].push(story);
      } )

      return Object.keys(groups).map( key => {
        let group = groups[key];
        let toneGroups = {};

        group.title = key;

        group.forEach(item => {
          item.tone.forEach(item => {
            if (!toneGroups[item.tone_id])
              toneGroups[item.tone_id] = [];

            toneGroups[item.tone_id].push(item);
          })
        })

        group.tone = Object.keys(toneGroups).map( key => {
          let toneGroup = toneGroups[key];
          let reference = toneGroup[0];

          return {
            tone_id: reference.tone_id,
            tone_name: reference.tone_name,
            score: toneGroup.reduce( (carry, next) =>  carry + next.score, 0)/toneGroup.length
          }
        })
        
        return <Moods data={group} />
      } )
    }
  }

  render() {
    return (
      <div className="mood-list row">
        <h6 className=' mood-analysis-title col-12'>Tone Analysis</h6>
        <p className='mood-legend col-8 offset-2 mb-4 mt-2'>The graphs below represent an analysis of the tone for each article from IBM Watson's Tone Analyzer machine learning algorithm. The possible tones expressed include: sadness, analytical, tentative, fear and joy. If a graph appears empty, it does not have a prevailing tone from the five options.</p>
        {this.renderGroups()}
      </div>
    )
  }
}
