import React, { Component } from 'react';
import COLORS from '../../common/colors';

import './ResultsGraph.css';

class ResultGraph extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  get totalVotes(){
    return this.props.poll.results.reduce((acc, result) => {
      return acc + result.voteCount;
    }, 0);
  }

  get resultsWithPercentages(){
    let results = this.props.poll.results.map(result => {
      let votePercentage = this.totalVotes == 0 ? 0 : Math.floor(100 * result.voteCount / this.totalVotes);
      if (votePercentage > 100) {
        votePercentage = 100;
      }
      return Object.assign(result, { votePercentage });
    });


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
    let votePercentage = Math.floor(100 * result.voteCount / (this.totalVotes || 1));
    let votedOn = this.props.poll.votedOn && this.props.poll.votedOn[0];


    return (
      <div className="resultContainer" key={ i }>
        <div className="resultAnswer">
          { this.props.showVote && votedOn && result.answerText == votedOn.answerText &&
            <img src={ require('../../images/poll_tick_icon.png') }/>
          }
          <span className="resultAnswerText">{ result.answerText }</span>
        </div>

        <div className="graph">
          <div className="voteCount">
            { result.voteCount }
          </div>
          <div className="votePercentage">
            { result.votePercentage }%
          </div>
         <div className="voteBarContainer">
           <div className="voteBarInner" style={{width: `${votePercentage}%`, backgroundColor: COLORS[i]}}>
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
