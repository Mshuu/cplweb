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

  get descriptionText(){
		if (this.poll.friendIsStar == 'T'){
			if(this.poll.createdPoll == 'T'){
				return (
					<div className="pollLeft">
						<span className="textHightlightGreen">{ this.poll.friendTwitterName }</span> created poll #{ this.poll.pollId }
						<span className="textHightlightBlack"> '{this.poll.topic}'</span>
					</div>
				);
			} else {
				return (
					<div className="pollLeft">
						<span className="textHightlightGreen">{ this.poll.friendTwitterName }</span> voted on on poll #{ this.poll.pollId }
						<span className="textHightlightBlack"> '{this.poll.topic}'</span>
					</div>
				);
			}
		} else {
    if(this.poll.createdPoll == 'T'){
      return (
        <div className="pollLeft">
          <span className="textHightlightGreen">{ this.poll.username }</span> created poll #{ this.poll.pollId }
          <span className="textHightlightBlack"> '{this.poll.topic}'</span>
        </div>
      );
    } else {
      return (
        <div className="pollLeft">
          <span className="textHightlightGreen">{ this.poll.username }</span> voted on on poll #{ this.poll.pollId }
          <span className="textHightlightBlack"> '{this.poll.topic}'</span>
        </div>
      );
    }
	}
  }

  render() {
    return (
      <div className="socialPoll">
        { this.descriptionText }

        <div className="pollRight">
          { this.button() }
        </div>
      </div>
    );
  }
}

export default withRouter(SocialPoll);
