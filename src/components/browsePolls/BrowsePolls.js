import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import FullScreenPollList from '../common/FullScreenPollList';
import HomeHeader from '../common/HomeHeader';
import CategoryList from '../common/CategoryList';
import LocationControl from '../common/LocationControl';
import SummaryHeader from './components/SummaryHeader';
import SortControl from '../common/SortControl';
import ShowMore from '../common/ShowMore';

import './CompletedPolls.css';

const LOAD_MORE_QTY = 20;

class BrowsePolls extends Component {
  constructor(props){
    super(props);

    this.store = props.store;
    this.category = this.props.match.params.category;

    this.state = {
      loading: false,
      locationFilter: 'Global',
      sortOrder: 'mostVotes',
      loadingMore: false,
      canLoadMore: true
    };
  }

  componentWillReceiveProps(props){
    this.category = props.match.params.category ? props.match.params.category : null;
    this.webFetch(true);
  }

  get isCategorySelected(){
    return (typeof this.category) == 'string';
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(resetCache = false){
    if(this.store.hydrateCheck() || !this.isCategorySelected)
      return;
    
    if(resetCache)
      this.store.setCategoryPolls(this.category, []);

    this.setState({
      loading: resetCache,
      loadingMore: true,
    });

    let existingPolls = this.store.getCategoryPolls(this.category);

    let response = await WebApi.getPolls({
      active: 'false',
      type: 'Completed',
      category: this.category,
      sortOrder: this.state.sortOrder,
      recordStartNo: existingPolls.length,
      recordQty: LOAD_MORE_QTY,
      positionLatitude: '',
      positionLongitude: '',
      locationFilter: this.state.locationFilter
    });

    this.store.setCategoryPolls(this.category, existingPolls.concat(response.polls));

    this.setState({
      loading: false,
      loadingMore: false,
      canLoadMore: response.polls && response.polls.length == LOAD_MORE_QTY
    });
  }

  changeLocationFilter(locationFilter){
    if(this.state.locationFilter == locationFilter) return;

    this.state.locationFilter = locationFilter;
    this.webFetch(true);
  }

  changeSortOrder(sortOrder){
    if(this.state.sortOrder == sortOrder) return;

    this.state.sortOrder = sortOrder;
    this.webFetch(true);
  }

  get content(){
    if(!this.isCategorySelected)
      return <CategoryList />
    else
      return (
        <div>
          <div className="headerLocation">
            <LocationControl defaultLocation={ this.state.locationFilter} onChange={location => this.changeLocationFilter(location)} />
          </div>
          <div className="headerNameFilter">
            <SummaryHeader category={this.category} />
            <SortControl sortOrder={ this.state.sortOrder} onChange={order => this.changeSortOrder(order)} />
          </div>
          <FullScreenPollList polls={this.store.getCategoryPolls(this.category)} showSortOrder={ false }/>
        </div>
      );
  }

  render() {
    return (
      <div className="completedPolls">
        <LoadingOverlay enabled={ this.state.loading }/>
        <HomeHeader />
        { this.content }
        <ShowMore moreAvailable={ this.state.canLoadMore } loading={this.state.loadingMore} onClick={() => this.webFetch()} />
      </div>
    );
  }
}

export default BrowsePolls;
