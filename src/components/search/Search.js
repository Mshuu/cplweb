import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import FullScreenPollList from '../common/FullScreenPollList';
import HomeHeader from '../common/HomeHeader';

import * as qs from 'query-string';

import './Search.css';

class Search extends Component {
  constructor(props){
    super(props);

    this.store = props.store;
 
    let params = qs.parse(props.location.search); 
    this.searchTerm = params.q;

    this.state = {
      loading: false,
    };
  }

  componentWillReceiveProps(props){
    let params = qs.parse(props.location.search); 
    this.searchTerm = params.q;
    this.webFetch();
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

    let response = await WebApi.doSearch( this.searchTerm );
    this.store.setSearchResult(this.searchTerm, response.polls);

    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <div className="search">
        <LoadingOverlay enabled={ this.state.loading }/>
        <HomeHeader searchText={this.searchTerm} />
        <FullScreenPollList polls={this.store.getSearchResult(this.searchTerm)} forceNormal={ true } showSortOrder={ false } />
      </div>
    );
  }
}

export default Search;
