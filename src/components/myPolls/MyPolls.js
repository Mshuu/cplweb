import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import FullScreenPollList from '../common/FullScreenPollList';
import HomeHeader from '../common/HomeHeader';
import SummaryHeader from '../completedPolls/components/SummaryHeader';
import SortControl from '../common/SortControl';
import ShowMore from '../common/ShowMore';

import '../completedPolls/CompletedPolls.css';

const LOAD_MORE_QTY = 20;

class MyPolls extends Component {
  constructor(props){
    super(props);

    this.store = props.store;

    this.state = {
      loading: true,
      sortOrder: 'newest',
      loadingMore: false,
      canLoadMore: (this.store.getMyVotes() == LOAD_MORE_QTY)
    };
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(resetCache = true){
    if(this.store.hydrateCheck()){
      this.setState({loading: false});
      return;
    }

    this.setState({
      loadingMore: true,
    });

    let existingPolls = resetCache ? [] : this.store.getMyVotes();

    let response = await WebApi.getPolls({
      category: 'All',
      type: 'MyPolls',
      active: 'true',
      sortOrder: this.state.sortOrder,
      recordStartNo: existingPolls.length,
      recordQty: LOAD_MORE_QTY,
      positionLatitude: '',
      positionLongitude: '',
      locationFilter: ''
    });

    this.store.setMyVotes(existingPolls.concat(response.polls));

    this.setState({
      loading: false,
      loadingMore: false,
      canLoadMore: response.polls && response.polls.length == LOAD_MORE_QTY
    });
  }

  changeSortOrder(sortOrder){
    if(this.state.sortOrder == sortOrder) return;

    this.state.sortOrder = sortOrder;
    this.webFetch(true);
  }

  get content(){
    return (
      <div>
        <div className="headerNameFilter">
          <SummaryHeader category={'MyPolls'} />
          <SortControl sortOrder={ this.state.sortOrder} onChange={order => this.changeSortOrder(order)} />
        </div>
        <FullScreenPollList polls={this.store.getMyVotes()} showSortOrder={ false } forceNormal={ true }/>
      </div>
    );
  }

  get showMoreElement(){
    return <ShowMore moreAvailable={ this.state.canLoadMore } loading={this.state.loadingMore} onClick={() => this.webFetch(false)} />
  }

  render() {
    return (
      <div className="completedPolls">
        <LoadingOverlay enabled={ this.state.loading }/>
        <HomeHeader />
        { this.content }
        { this.showMoreElement }
      </div>
    );
  }
}

export default MyPolls;
