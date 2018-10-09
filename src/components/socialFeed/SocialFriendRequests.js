import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import WebApi from '../../models/webApi';

import './SocialFriendRequests.css';

class SocialFriendRequests extends Component {
  constructor(props){
    super(props);
    this.state = {requests: []}
  }

  componentWillMount(){
    if(!IS_SERVER){
      this.fetchRequests();
    }
  }

  async fetchRequests(){
    this.setState({
      loading: true,
    });

    let response = await WebApi.fetchFriendRequests();

    this.setState({
      loading: false,
      requests: response.requests
    });
  }

  async rejectFriend(friendId){
    this.setState({
      loading: true,
    });

    await WebApi.ignoreFriendRequest(friendId);
    this.props.onRefresh();

    let response = await WebApi.fetchFriendRequests();

    this.setState({
      loading: false,
      requests: response.requests
    });
  }

  async acceptFriend(friendId){
    this.setState({
      loading: true,
    });

    await WebApi.approveFriendRequest(friendId);
    this.props.onRefresh();

    let response = await WebApi.fetchFriendRequests();

    this.setState({
      loading: false,
      requests: response.requests
    });
  }

  friendRequest(request, i){
    return (
      <div className="friendRequest" key={ i }>
        <div className="requestName">
          { request.friendName }
        </div>

        <div className="rejectRequest" onClick={ () => this.rejectFriend(request.id) }>
          <img src={ require('../images/friend_reject_icon.png') } />
        </div>

        <div className="acceptRequest" onClick={ () => this.acceptFriend(request.id) }>
          <img src={ require('../images/friend_accept_icon.png') } />
        </div>
      </div>
    );
  }

  get friendRequests(){
    if(this.state.requests.length == 0)
      return <span className="lolNoFriends">No friend requests</span>;
    else {
      return this.state.requests.map(request => this.friendRequest(request))
    }
  }

  get content(){
    if(this.state.loading){
      return (
        <div className="friendContainer">
          <span className="lolNoFriends">Loading</span>
        </div>
      );
    } else {
      return (
        <div className="friendContainer">
          { this.friendRequests }
        </div>
      );
    }
  }

  render() {
    return (
      <div className="socialFriendRequests">
        <div className="requestHeader">
          <img src={ require('../images/friend_request_icon.png') } />
          <span>Friend Requests</span>
        </div>

        { this.content }
      </div>
    );
  }
}

export default SocialFriendRequests;
