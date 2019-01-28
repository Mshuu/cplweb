import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PollModel from '../../models/Poll';
import './poll.css';

class Poll extends Component {
  static defaultProps = {
    forceNormal: false
  };

  constructor(props){
    super(props);

    this.poll = new PollModel(props.poll);
  }

  openPoll(){
    this.props.history.push(`/poll/${this.poll.id}`);
  }
  openAdvert(){
    var win = window.open(this.poll.url, '_blank');
    win.focus();
  }

  button(){
     if (this.poll.isAdvert){
       return (
         <span className="pollVoteButton2" onClick={ () => this.openAdvert() }>
           { this.poll.btnText }
         </span>
       )
     } else {
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
  }

  renderStar(){
    return (
      <div className="starPoll">
        <div className="pollTop">
          <div className="pollStarImage">
            <img src={ this.props.poll.twitterAvatar } />
          </div>
          <div className="pollTopQuestion">
            <div className="pollTopName">
              { this.props.poll.twitterName }
            </div>
            <div className="pollTopQuestionText">
              { this.props.poll.question }
            </div>
          </div>
        </div>
        <div className="pollBottom">
                    { !this.props.poll.isAdvert &&
          <span className="pollVotes">

            <img src={ require('../images/poll_tick_icon.png') } />
            { this.props.poll.pollVotes }
          </span>
        }
          { !this.poll.hasExpired && this.poll.twitterName != "Sponsored Poll" &&  (
            <span className="pollTimeRemaining">
              <img src={ require('../images/poll_clock_icon.png') } />
              { this.poll.timeRemaining }
            </span>
          )}
          { this.poll.twitterName == "Sponsored Poll" &&  (
            <span className="pollTimeRemaining">
            </span>
          )}
          { this.button() }
        </div>
      </div>
    );
  }

  renderNormal() {
    return (
      <div className="poll">
        <div className="pollTop">
        { !this.props.poll.isAdvert &&
          <div className="pollTopHeader">
            <span className="pollNumber">
              <img src={ require('../images/poll_hash_icon.png') } />
              { this.poll.id }
            </span>
            { !this.poll.hasExpired && (
              <span className="pollTimeRemaining">
                <img src={ require('../images/poll_clock_icon.png') } />
                { this.poll.timeRemaining }
              </span>
              )
            }
          </div>
        }
        { this.props.poll.isAdvert &&
          <div className="pollTopHeader">
            <span className="pollNumber2">
              {this.poll.title}
            </span>
              <span className="pollTimeRemaining2">
              Ad
              </span>
          </div>
        }
          <div className="pollTopQuestion">
            { this.poll.question }
          </div>
        </div>
        <div className="pollBottom">
        { !this.props.poll.isAdvert &&
<span className="pollVotes">

<img src={ require('../images/poll_tick_icon.png') } />
{ this.props.poll.pollVotes }
</span>
}
          { this.button() }
        </div>
      </div>
    );
  }

  render(){
    if(!this.props.forceNormal && this.poll.type == 'Star')
      return this.renderStar();
    else
      return this.renderNormal();
  }
}

export default withRouter(Poll);
