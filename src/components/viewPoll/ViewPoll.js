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
      showOnFeed: true,
      showVote: true
    };
  }

  componentWillReceiveProps(props){
    this.pollId = props.match.params.pollId;
    this.store.setPoll(this.pollId, null);
    this.setState({
      loading: true
    });
    this.webFetch();
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  toggleSocial(){
    this.setState({ showOnFeed: !this.state.showOnFeed });
  }

  toggleVote(){
    this.setState({ showVote: !this.state.showVote });
  }
	async webFetch(){
		if(this.store.hydrateCheck()){
      return;
    }
		console.log("fetching");
		if (this.state.authenticated == true){
			this.setState({
				loading: true
			});

			let poll = await WebApi.fetchPoll( this.pollId );
			this.store.setPoll(this.pollId, poll);

			this.setState({
				loading: false
			});
		} else {
			this.setState({
				loading: true
			});

			let poll = await WebApi.fetchPollAnon( this.pollId );
			this.store.setPoll(this.pollId, poll);

			this.setState({
				loading: false
			});
		}

	}

  async performVote(answerIdx,auth){
    this.setState({
      loading: true
    });

		if (this.state.authenticated == true){
		console.log("auth yes");
    let response = await WebApi.voteOnPoll( this.pollId, answerIdx, this.state.showOnFeed );
		console.log("response: " + response);
    if(response.success){
      let poll = this.store.getPoll(this.pollId);
      poll.results = response.results;
      poll.hasVoted = true;
      poll.votedOn = [{answerText: answerIdx }];

      this.store.setPoll(this.pollId, poll);
    } else {
      alert('Error');
    }
		this.setState({
			loading: false
		});
	} else {
		console.log("auth no : " + this.pollId + " " + answerIdx + " " + this.state.showOnFeed);
		    let response = await WebApi.voteOnPollAnon( this.pollId, answerIdx, this.state.showOnFeed );
				console.log("response: " + response);
		    if(response.success){
		      let poll = this.store.getPoll(this.pollId);
		      poll.results = response.results;
		      poll.hasVoted = true;
		      poll.votedOn = [{answerText: answerIdx }];

		      this.store.setPoll(this.pollId, poll);
		    } else {
		      alert('Error');
		    }
				this.setState({
					loading: false
				});
	}


  }

  shouldShowResults(poll){
		if (poll.isAnon == 0 && this.state.authenticated == false){
			console.log("POLL71: %j", poll);
			return true;
		} else {
    return (poll.hasVoted || poll.hasExpired);
	}
  }

  containerContent(poll){
    if(this.shouldShowResults(poll)){
      return (
        <ResultsGraph poll={ poll } showVote={ this.state.showVote } />
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
    return "https://twitter.com/share?url=" + this.currentUrlEscaped;
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
            Share this poll!
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
          <SummaryHeader category={ poll.category} type={ poll.type }/>
          <PollList category={ poll.category }  type={ poll.type }/>
        </div>
      );
    } else {
      return (
        <div className="pollInstallBanner">
          <div className="installBannerText">
            Not registered? Install ClearPoll app to get started!
          </div>
          <div className="installBannerImages">
            <a href="https://play.google.com/store/apps/details?id=com.nextechdevelopments.clearpoll" target="_blank">
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

    if(!pollData) {
		return null;
	}

    let poll = new Poll(pollData);
		console.log("pollDaTA: %j", pollData);
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
            { !this.shouldShowResults(poll) && (
                <div className="field socialField">
                  <div className="socialFeedText">Show friends you voted?</div>
                  <div className="socialFeedContainer">
                    <img src={ require('../images/social_share_icon.png')} />
                    { this.state.showOnFeed ?
                      <span className="socialButton enabled" onClick={() => this.toggleSocial()}>Yes</span> :
                      <span className="socialButton disabled" onClick={() => this.toggleSocial()}>No</span>
                    }
                  </div>
                </div>
            )
          }
          </div>
          <div className="contentContainer">
            { this.containerContent(poll) }
          </div>
        </div>
        { this.shouldShowResults(poll) && (
          <div className="voteControlContainer">
            <div className="voteControl" onClick={() => this.toggleVote()}>
              { this.state.showVote ? "Hide Vote" : "Show Vote" }
            </div>
          </div>
        )}

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
