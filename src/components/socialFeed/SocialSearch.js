import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';

import './SocialSearch.css';

class SocialSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
      resultsOpen: false,
      loading: false,
      results: [],
      requestsSent: []
    }
  }

  closeResults(){
    this.setState({ resultsOpen: false });
  }

  async sendFriendRequest(friendId){
    WebApi.sendFriendRequest(friendId);

    this.state.requestsSent.push(friendId);
    this.forceUpdate();
  }

  get searchString(){
    return this.state.searchText.trim();
  }

  async doSearch(e){
    if(this.searchString.length == 0) return;

    this.setState({
      loading: true,
      resultsOpen: true,
      results: []
    });

    let response = await WebApi.searchUsername(this.searchString);

    console.dir(response);

    this.setState({
      loading: false,
      results: response.users
    });
  }

  get results(){
    return this.state.results.map((user, i) => {
      return (
        <div className="searchResult">
          <span>{ user.username }</span>
          { this.state.requestsSent.includes(user.id) ?
            <img src={ require('../images/friend_accept_icon.png') } /> :
            <img src={ require('../images/friend_add_icon.png') } onClick={ () => this.sendFriendRequest(user.id) } /> }
        </div>
      );
    });    
  }

  render() {
    return (
      <div className="socialSearch">
        <div className="searchHeader">
          <img src={ require('../images/add_friends_icon.png') } />
        </div>

        <div className="socialSeachContainer">
          <input type="text"
            placeholder="Add friend by username"
            value={this.state.searchText}
            onChange={ e => this.setState({searchText: e.target.value}) }
          />

          <span className="socialSearchButton" onClick={() => this.doSearch()}>
            <img className="searchIcon" src={ require('../images/search_icon.png')} />
          </span>
        </div>

        <div className={ this.state.resultsOpen ? "socialSearchResults" : "socialSearchResults inactive" }>
          <LoadingOverlay enabled={ this.state.loading } fullScreen={ false } />
  
          { !this.state.loading && (
            <div className="userResultsContainer">
              { this.results }
            </div>
          )}
          { !this.state.loading && (
            <div className="closeResults" onClick={ () => this.closeResults() }>
              Close
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SocialSearch;
