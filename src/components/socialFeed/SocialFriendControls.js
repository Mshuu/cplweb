import React, { Component } from 'react';

import WebApi from '../../models/webApi';
import Poll from '../../models/Poll';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import SocialSearch from './SocialSearch';
import SocialFriendRequests from './SocialFriendRequests';
import SocialFriendList from './SocialFriendList';
import './SocialFriendControls.css';

const LOAD_MORE_QTY = 16;

class SocialFriendControls extends Component {
  constructor(props){
    super(props);

    this.store = props.store;
    this.friendList = React.createRef();
  }

  refresh(performFetch = true){
    this.friendList.current.refresh(performFetch)
    this.props.onRefresh(performFetch);
  }

  render() {
    return (
      <div className="socialFriendControls">
        <div className="socialHeader">
          <span>Manage Friends</span>
          <img src={ require('../images/add_friends_icon.png') } />
        </div>

        <SocialSearch />
        <SocialFriendRequests onRefresh={ performFetch => this.refresh(performFetch) } />
        <SocialFriendList ref={ this.friendList } onRefresh={ performFetch => this.props.onRefresh(performFetch) } />
      </div>
    );
  }
}

export default SocialFriendControls;
