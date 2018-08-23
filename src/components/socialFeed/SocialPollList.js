import React, { Component } from 'react';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import SocialPoll from './SocialPoll';

import './SocialPollList.css';

const LOAD_MORE_QTY = 18;

class SocialPollList extends Component {
  constructor(props){
    super(props);

    this.store = props.store;

    this.state = {
      loading: true,
      canLoadMore: (this.store.getSocialFeed() == LOAD_MORE_QTY)
    };
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  refresh(performFetch){
    if(performFetch)
      this.webFetch();
    else
      this.setState({
        loading: true,
      });
  }

  async webFetch(resetCache = true){
    if(this.store.hydrateCheck()){
      this.setState({loading: false});
      return;
    }
    
    this.setState({
      loading: true,
    });

    let existingPolls = resetCache ? [] : this.store.getSocialFeed();

    let response = await WebApi.fetchSocialFeed({
      sortingOrder: 'mostVotes',
      quantity: LOAD_MORE_QTY,
      positionLatitude: '',
      positionLongitude: ''
    });

    console.dir(response);

    this.store.setSocialFeed(existingPolls.concat(response.polls));

    this.setState({
      loading: false,
      canLoadMore: response.polls && response.polls.length == LOAD_MORE_QTY
    });
  }

  get showMoreElement(){
    return <ShowMore moreAvailable={ this.state.canLoadMore } loading={this.state.loadingMore} onClick={() => this.webFetch(false)} />
  }

  render() {
    return (
      <div className="socialPollList">
        <LoadingOverlay enabled={ this.state.loading } fullScreen={ false } />

        { this.store.getSocialFeed().map( (poll, i) => <SocialPoll poll={ poll } key={ i } /> ) }
      </div>
    );
  }
}

export default SocialPollList;
