import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import AnswerList from './components/AnswerList';
import ResultsGraph from './components/ResultsGraph';
import SummaryHeader from './components/SummaryHeader';
import PollList from '../common/PollList';

import './ViewPoll.css';

class ViewPoll extends Component {
  constructor(props){
    super(props);

    this.store = props.store;
    this.pollId = this.props.match.params.pollId;

    this.state = {
      authenticated: this.store.getAuthenticated(),
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
    if(this.store.hydrateCheck() || !this.store.getAuthenticated()){
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
    if((poll.hasVoted || poll.hasExpired) || !this.store.getAuthenticated()){
      return (
        <ResultsGraph results={ poll.results } totalVotes={ poll.pollVotes } />
      );
    } else {
      return (
        <AnswerList answers={poll.answers} onVote={ answerIdx => this.performVote(answerIdx) }/>
      );
    }
  }

  get currentUrlEscaped(){
    return `${SERVER_BASE_URL}${this.props.location.pathname}`
  }

  get twitterShareUrl(){
    return "https://twitter.com/home?status=" + this.currentUrlEscaped;
  }

  get facebookShareUrl(){
    return "https://www.facebook.com/sharer/sharer.php?u=" + this.currentUrlEscaped;
  }

  get googleShareUrl(){
    return "https://plus.google.com/share?url=" + this.currentUrlEscaped;
  }

  get redditShareUrl(){
    return "http://www.reddit.com/submit?url=" + this.currentUrlEscaped;
  }

  numberToCommaFormat(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  get socialContent(){
    if(this.state.authenticated) {
      return (
        <div className="socialContainer">
          <div className="socialBanner">
            Share Your Vote!
          </div>
          <div className="socialButtons">
            <a target="_blank" href={ this.twitterShareUrl }>
              <img src={require('../images/twitter_icon.png')} />
            </a>
            <a target="_blank" href={ this.facebookShareUrl }>
              <img src={require('../images/facebook_icon.png')} />
            </a>
            <a target="_blank" href={ this.googleShareUrl }>
              <img src={require('../images/google_icon.png')} />
            </a>
            <a target="_blank" href={ this.redditShareUrl }>
              <img src={require('../images/reddit_icon.png')} />
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="socialContainer">
          <div className="socialBanner">
            <a className="voteButton" href="/login">Vote</a>
          </div>
        </div>
      );
    }
  }

  summaryContent(poll){
    if(this.state.authenticated) {
      return (
        <div className="summaryContainer">
          <SummaryHeader category={ poll.category } />
          <PollList category={ poll.category } />
        </div>
      );
    } else {
      return (
        <div className="pollInstallBanner">
          <div className="installBannerText">
            Not registered? Install ClearPoll app to get started!
          </div>
          <div className="installBannerImages">
            <a href="https://play.google.com/store/apps/developer?id=ClearPoll" target="_blank">
              <img src={ require('../images/google_play_icon.png') }/>
            </a>
            <a href="https://itunes.apple.com/us/app/clearpoll/id1347664374" target="_blank">
              <img src={ require('../images/app_store_icon.svg') }/>
            </a>
          </div>
        </div>
      );
    }
  }

  pollElement(){
    let pollData = this.store.getPoll(this.pollId);

    if(!pollData) return null;

    let poll = new Poll(pollData);

    return (
      <div>
        <div className="pollQuestion">
          { poll.question }
        </div>

        <div className="mainRow">
          <div className="detailsContainer">
            <div className="field">
              <img src={ require('../images/poll_hash_icon.png') } />
              { poll.pollId }
            </div>
            <div className="field">
              <img src={ require('../images/poll_tick_icon.png') } />
              { this.numberToCommaFormat(poll.pollVotes) }
            </div>
            { !poll.hasExpired && (
              <div className="field">
                <img src={ require('../images/poll_clock_icon.png') } />
                { poll.timeRemaining }
              </div>
            )}
          </div>
          <div className="contentContainer">
            { this.containerContent(poll) }
          </div>
        </div>

        { this.socialContent }

        { this.summaryContent(poll) }
      </div>
    );
  }

  render() {
    return (
      <div className="viewPoll">
        <LoadingOverlay enabled={ this.state.loading }/>

        { !this.state.loading && this.pollElement() }      
      </div>
    );
  }
}

export default ViewPoll;
