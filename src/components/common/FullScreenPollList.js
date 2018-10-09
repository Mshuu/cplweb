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
      sortOrder: "mostVotes"
    };
  }

  get pollElements(){
    if(!this.props.polls) return null;

    let polls = this.props.polls.slice(0);
    //this.applySortOrder(polls)

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
