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
import SocialPollList from './SocialPollList';
import SocialFriendControls from './SocialFriendControls';
import CategoryIcon from '../common/CategoryIcon';

import './SocialFeed.css';

class SocialFeed extends Component {
  constructor(props){
    super(props);

    this.store = props.store;
    this.pollList = React.createRef();
    this.state = { loading: false };
  }

  render() {
    return (
      <div className="socialFeed">
        <LoadingOverlay enabled={ this.state.loading }/>
        <HomeHeader />

        <div className="socialPageHeader">
          <img src={ CategoryIcon['Social'] } />
          Social
        </div>

        <div className="socialContent">
          <SocialPollList ref={ this.pollList } store={ this.store }/>
          <SocialFriendControls onRefresh={performFetch => this.pollList.current.refresh(performFetch) }/>
        </div>
      </div>
    );
  }
}

export default SocialFeed;
