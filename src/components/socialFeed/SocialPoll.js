import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './SocialPoll.css';

class SocialPoll extends Component {
  static defaultProps = {
    forceNormal: false
  };

  constructor(props){
    super(props);

    this.poll = props.poll;
  }

  openPoll(){
    this.props.history.push(`/poll/${this.poll.pollId}`);
  }

  button(){
    if(this.poll.hasVoted || this.poll.hasExpired)
      return (
        <span className="pollVoteButton resultsButton" onClick={ () => this.openPoll() }>
          Results
        </span>
      );
    else
      return (
        <span className="pollVoteButton" onClick={ () => this.openPoll() }>
          Vote
        </span>
      );
  }


  render() {
    return (
      <div className="socialPoll">
        <div className="pollLeft">
          <span className="textHightlightGreen">{ this.poll.friendName }</span> voted <span className="textHightlightBlack">'{ this.poll.friendVoted }'</span> on poll #{ this.poll.pollId}
          <span className="textHightlightBlack"> '{this.poll.topic}'</span>
        </div>
        <div className="pollRight">
          { this.button() }
        </div>  
      </div>
    );
  }
}

export default withRouter(SocialPoll);
