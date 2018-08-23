import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import WebApi from '../../models/webApi';

import './SocialFriendList.css';

class SocialFriendList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      friends: []
    }
  }

  componentWillMount(){
    if(!IS_SERVER){
      this.fetchRequests();
    }
  }

  refresh(performFetch){
    this.fetchRequests();
  }

  async fetchRequests(){
    this.setState({
      loading: true,
    });

    let response = await WebApi.fetchFriends();

    this.setState({
      loading: false,
      friends: response.friends
    });
  }

  async toggleMute(friendId){
    this.props.onRefresh(false);
    let friend = this.state.friends.find(f => f.id == friendId);
    let requestPromise;

    if(friend.muted == 0){
      friend.muted = 1;
      requestPromise = WebApi.muteFriend(friendId);
    } else {
      friend.muted = 0;
      requestPromise = WebApi.unmuteFriend(friendId);
    }

    this.forceUpdate();

    await requestPromise;
    this.props.onRefresh(true);
  }

  async removeFriend(friendId){
    let friend = this.state.friends.find(f => f.id == friendId);

    if(confirm(`Are you sure you want to remove ${ friend.username }?`)){
      let removePromise = WebApi.ignoreFriendRequest(friendId);

      let friends = this.state.friends.filter(f => f.id != friendId);
      this.setState({friends});

      await removePromise;
      this.props.onRefresh();
    }
  }

  friend(friend, i){
    console.dir(friend);
    return (
      <div className="friend" key={ i }>
        <div className={`muteToggle ${ friend.muted == 0 ? 'notMuted' : 'muted' }`} onClick={ () => this.toggleMute(friend.id) } >
          {
            friend.muted == 0 ? <img src={ require('../images/friend_unmuted_icon.png') } /> : <img src={ require('../images/friend_muted_icon.png') } />
          }
        </div>
        <div className="friendName">
          { friend.username }
        </div>
        <div className="unfriend" onClick={ () => this.removeFriend(friend.id) } >
          <img src={ require('../images/friend_remove_icon.png') } />
        </div>
      </div>
    );
  }

  get friends(){
    if(this.state.friends.length == 0)
      return <span className="lolNoFriends">No friends</span>;
    else {
      return this.state.friends.map(friend => this.friend(friend))
    }
  }

  get content(){
    if(this.state.loading){
      return (
        <div className="friendContainer">
          <div className="friend loading">
            Loading
          </div>
        </div>
      );
    } else {
      return (
        <div className="friendContainer">
          { this.friends }
        </div>
      );
    }
  }

  render() {
    return (
      <div className="socialFriends">
        <div className="friendsHeader">
          <img src={ require('../images/friends_icon.png') } />
        </div>

        { this.content }
      </div>
    );
  }
}

export default SocialFriendList;
