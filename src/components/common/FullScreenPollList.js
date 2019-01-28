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
    console.log("HERE");
    let advert = await WebApi.FetchAdvert(category);
    this.setState({
      advert: advert.advert,
      hasFetched: true
    });
  }

  get pollElements(){
    if(!this.props.polls) return null;

    let polls = this.props.polls.slice(0);
    //this.applySortOrder(polls)
    console.log("props: %j", this.props.polls);
    console.log("hasFetched: " + this.state.hasFetched);
  if (!IS_SERVER && !(this.props.polls === undefined) && this.props.polls.length != 0){
    if (!this.state.hasFetched && this.props.polls){
      console.log("firing");
      this.fetchAdvert(this.props.polls.slice(0)[0].category);
    }
    console.log("aint server");
    console.log("this.props: %j",this.props.polls);
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
    polls.splice(Math.floor((Math.random() * this.props.polls.length) + 1),1,newAdvert);
    polls.splice(Math.floor((Math.random() * this.props.polls.length) + 1),1,newAdvert);
    polls.splice(Math.floor((Math.random() * this.props.polls.length) + 1),1,newAdvert);
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
