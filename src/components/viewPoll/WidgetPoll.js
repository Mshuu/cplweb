import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import AnswerList from './widgetComponents/AnswerList';
import ResultsGraph from './widgetComponents/ResultsGraph';
import WidgetHeader from './widgetComponents/header';

import './WidgetPoll.css';

class WidgetPoll extends Component {
  constructor(props){
    super(props);

    this.store = props.store;
    this.pollId = this.props.match.params.pollId;

    this.state = {
      loading: false,
      showOnFeed: true
    };
  }

  componentWillReceiveProps(props){
    this.pollId = props.match.params.pollId;
    this.store.setPoll(this.pollId, null);
    this.setState({
      loading: true,
      showOnFeed: true
    });
    this.webFetch();
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(){
    if(this.store.hydrateCheck()){
      return;
    }

    this.setState({
      loading: true
    });

    let poll = await WebApi.fetchPoll( this.pollId );
    this.store.setPoll(this.pollId, poll);

    this.setState({
      loading: false
    });
  }

  async performVote(answerIdx){
    this.setState({
      loading: true
    });

    let response = await WebApi.voteOnPoll( this.pollId, answerIdx, this.state.showOnFeed );

    if(response.success){
      let poll = this.store.getPoll(this.pollId);
      poll.results = response.results;
      poll.hasVoted = true;
      poll.votedOn = [{answerId: answerIdx, answerText: poll.answers[answerIdx] }];

      this.store.setPoll(this.pollId, poll);
    } else {
      alert('Error');
    }

    this.setState({
      loading: false
    });
  }

  containerContent(poll){
    if(poll.hasVoted || poll.hasExpired){
      return (
        <ResultsGraph results={ poll.results } totalVotes={ poll.pollVotes } />
      );
    } else {
      return (
        <AnswerList answers={poll.answers} onVote={ answerIdx => this.performVote(answerIdx) }/>
      );
    }
  }

  numberToCommaFormat(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  pollElement(poll){
    return (
      <div className="scrollableContainer">
        <div className="pollQuestion">
          { poll.question }
        </div>
        <div className="contentContainer">
          { this.containerContent(poll) }
        </div>
      </div>
    );
  }

  render() {
    let pollData = this.store.getPoll(this.pollId);
    let poll = pollData ? new Poll(pollData) : null;

    return (
      <div className="widgetPoll">
        <LoadingOverlay enabled={ this.state.loading }/>

        {poll && <WidgetHeader pollId={poll.pollId} pollVotes={this.numberToCommaFormat(poll.pollVotes)} pollTime={poll.timeRemaining}/> }
        { this.pollElement(poll) }      
      </div>
    );
  }
}

export default WidgetPoll;
