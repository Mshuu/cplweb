import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import LoadingOverlay from '../../loadingOverlay/LoadingOverlay';
import StarGraph from './StarGraph';



import './RatingPoll.css';

class RatingPoll extends Component {
  constructor(props){
    super(props);
  }

  get averageScoreString(){
    return parseFloat(Math.round(this.props.poll.averageRating * 10) / 10).toFixed(1);
  }

  get questionFontSize(){
    let calcSize = 5 - Math.max(0, this.props.poll.question.length - 14)*0.20
    return Math.min(5, calcSize)
  }

  render() {
    return (
      <div className="ratingPoll">
        <LoadingOverlay enabled={ this.props.loading }/>

        <div className="topRow">
          <div className="avgScore">{ this.averageScoreString }</div>
          <div className="question" style={{fontSize: `${this.questionFontSize}vw`}}>{ this.props.poll.question }</div>
          <div className="votes">
            <img src={ require('../../images/poll_tick_icon.png') } />
            { this.props.poll.votes }
          </div>
          <div className="id">
            <img src={ require('../../images/poll_hash_icon.png') } />
            { this.props.poll.pollId }
          </div>
        </div>
        <div className="bottomRow">
          <StarGraph
            enabled={ !this.props.poll.hasExpired }
            averageRating={this.props.poll.averageRating}
            onClick={ answerIdx => this.props.onAnswer(answerIdx) }
            userAnswer={ this.props.poll.votedOn && this.props.poll.votedOn[0] }
          />
        </div>
      </div>
    );
  }
}

export default RatingPoll; //
