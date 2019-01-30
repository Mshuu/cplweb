import React, { Component } from 'react';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';
import Poll from '../common/poll';
import SortControl from '../common/SortControl';

import './PollList.css';

class FullScreenPollList extends Component {
  static defaultProps = {
    showSortOrder: true,
    forceNormal: false
  };

  constructor(props){
    super(props);

    this.state = {
      sortOrder: "mostVotes",
      hasFetched: false
    };
  }
  async fetchAdvert(category){
    let advert = await WebApi.FetchAdvert(category);
    let advert2 = await WebApi.FetchAdvert(category);
    let advert3 = await WebApi.FetchAdvert(category);
    this.setState({
      advert: advert.advert,
      advert2: advert2.advert,
      advert3: advert3.advert,
      hasFetched: true
    });
  }

  get pollElements(){
    if(!this.props.polls) return null;

    let polls = this.props.polls.slice(0);
    //this.applySortOrder(polls)
  if (!IS_SERVER && !(this.props.polls === undefined) && this.props.polls.length != 0){
    if (!this.state.hasFetched && this.props.polls){
      this.fetchAdvert(this.props.polls.slice(0)[0].category);
    }
    if (this.state.advert){
    let newAdvert = {
      category: polls[0].category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert.url,
      title: this.state.advert.headline,
      btnText: this.state.advert.btnText
    };
    let newAdvert2 = {
      category: polls[0].category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert2.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert2.url,
      title: this.state.advert2.headline,
      btnText: this.state.advert2.btnText
    };
    let newAdvert3 = {
      category: polls[0].category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert3.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert3.url,
      title: this.state.advert3.headline,
      btnText: this.state.advert3.btnText
    };
    polls.splice(Math.floor((Math.random() * this.props.polls.length) + 1),1,newAdvert);
    polls.splice(Math.floor((Math.random() * this.props.polls.length) + 1),1,newAdvert2);
    polls.splice(Math.floor((Math.random() * this.props.polls.length) + 1),1,newAdvert3);
  }
}


    return polls.map( (poll, i) => {
      return (
        <Poll poll={ poll } key={poll.id} forceNormal={ this.props.forceNormal } />
      );
    });
  }

  changeSortOrder(sortOrder){
    this.setState({sortOrder})
    this.forceUpdate();
  }

  applySortOrder(polls){
    switch(this.state.sortOrder){
      case "mostVotes":
        polls.sort((a,b) => {return b.pollVotes - a.pollVotes});
        break;

      case "endingSoonest":
        polls.sort((a,b) => {return a.pollTime - b.pollTime});
        break;

      case "newest":
        polls.sort((a,b) => {return b.pollTime - a.pollTime});
        break;
    }
  }

  render() {
    return (
      <div className="fullScreenPollListContainer">
        <div className="headerContainer">

          { this.props.showSortOrder && <SortControl sortOrder={ this.state.sortOrder} onChange={order => this.changeSortOrder(order)} /> }
        </div>
        <div className="pollListContainer">
          <div className="polls">
            { this.pollElements }
          </div>
        </div>
      </div>
    );
  }
}

export default FullScreenPollList;
