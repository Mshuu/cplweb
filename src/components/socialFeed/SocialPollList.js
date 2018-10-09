import React, { Component } from 'react';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import SocialPoll from './SocialPoll';
import ShowMore from '../common/ShowMore';

import './SocialPollList.css';

const LOAD_MORE_QTY = 20;

class SocialPollList extends Component {
  constructor(props){
    super(props);

    this.store = props.store;

    this.state = {
      loading: true,
      canLoadMore: (this.store.getSocialFeed().length == LOAD_MORE_QTY)
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
      loading: resetCache,
      loadingMore: true
    });

    let existingPolls = resetCache ? [] : this.store.getSocialFeed();

    let response = await WebApi.fetchSocialFeed({
      recordQty: LOAD_MORE_QTY,
      recordStartNo: existingPolls.length
    });

    console.dir(response);

    this.store.setSocialFeed(existingPolls.concat(response.polls));

    this.setState({
      loading: false,
      loadingMore: false,
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

        { !this.state.loading && this.store.getSocialFeed().map( (poll, i) => <SocialPoll poll={ poll } key={ i } /> ) }
        { !this.state.loading && this.showMoreElement }
      </div>
    );
  }
}

export default SocialPollList;
