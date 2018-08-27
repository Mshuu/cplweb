import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as qs from 'query-string';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import AnswerList from './widgetComponents/AnswerList';
import ResultsGraph from './widgetComponents/ResultsGraph';
import WidgetHeader from './widgetComponents/header';
import WidgetFooter from './widgetComponents/footer';
import RatingPoll from './widgetComponents/RatingPoll';

import './WidgetPoll.css';

class WidgetPoll extends Component {
  constructor(props){
    super(props);
    console.dir(this.props);
    this.store = props.store;
    this.pollId = this.props.match.params.pollId;

    let params = qs.parse(props.location.search); 
    this.widgetType = params.type;

    this.state = {
      loading: false,
      showOnFeed: true
    };
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

  emitLoginMessage(){
    window.parent.postMessage({event: "openLogin", pollId: this.pollId}, '*');
  }

  async performVote(answerIdx){
    if(!this.store.getAuthenticated()){
      this.emitLoginMessage();
      return;
    }

    let poll = this.store.getPoll(this.pollId);

    if(poll.hasVoted) return;

    this.setState({
      loading: true
    });

    let response = await WebApi.voteOnPoll( this.pollId, answerIdx, this.state.showOnFeed );

    if(response.success){
      poll.results = response.results;
      poll.pollVotes += 1;
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

  standardPoll(poll){
    return (
      <div className="widgetPoll">
        <LoadingOverlay enabled={ this.state.loading }/>

        {poll && <WidgetHeader poll={poll} pollVotes={poll.votes} /> }

        { this.pollElement(poll) }      

        { !this.store.getAuthenticated() && <WidgetFooter onClick={() => this.emitLoginMessage()}/> }
      </div>
    );
  }

  render() {
    let pollData = this.store.getPoll(this.pollId);
    let poll = pollData ? new Poll(pollData) : null;

    if(this.widgetType == 'rating')
      return <RatingPoll poll={poll} loading={ this.state.loading } onAnswer={ answerIdx => this.performVote(answerIdx) } />;
    else
      return this.standardPoll(poll);
  }
}

export default WidgetPoll;
