import React, { Component } from 'react';
import COLORS from '../../common/colors';

import './ResultsGraph.css';

class ResultGraph extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  get totalVotes(){
    return this.props.results.reduce((acc, result) => {
      return acc + result.voteCount;
    }, 0);
  }

  get highestVotePercent(){
    return this.resultsWithPercentages.reduce((acc, result) => {
      return result.votePercentage > acc ? result.votePercentage : acc;
    }, 0);
  }

  get resultsWithPercentages(){
    let results = this.props.results.map(result => {
      return Object.assign(result, { votePercentage: Math.floor(100 * result.voteCount / this.totalVotes) });
    });


    // Fix the percentages so they add up to 100. Oh yes, I went there.
    while((100 - results.reduce((acc, result) => { return acc + result.votePercentage }, 0)) > 0){
      let highestIdx = -1;
      let highestDiff = 0;

      results.forEach((result, i) => {
        let percentDiff = (100 * result.voteCount / this.totalVotes) - result.votePercentage;
        if(percentDiff > 0 && percentDiff > highestDiff){
          highestIdx = i;
          highestDiff = percentDiff;
        }
      });

      if(highestIdx < 0) break;

      results[highestIdx].votePercentage++;
    }

    return results;
  }

  graphElement(result, i){
    let barPercentage = 0.8 * Math.floor(100 * result.votePercentage / this.highestVotePercent);

    return (
      <div className="resultContainer" key={ i }>
        <div className="resultAnswer">
          { result.answerText }
        </div>

        <div className="graph">
          <div className="voteCount">
            { result.voteCount }
          </div>
          <div className="votePercentage">
            { result.votePercentage }%
          </div>
         <div className="voteBarContainer">
           <div className="voteBarInner" style={{width: `${barPercentage}%`, backgroundColor: `${COLORS[i]} !important`}}>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="graphContainer">
        { this.resultsWithPercentages.map( (result, i) => this.graphElement(result, i) ) }
      </div>
    );
  }
}

export default ResultGraph;
