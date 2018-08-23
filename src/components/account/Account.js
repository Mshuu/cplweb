import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import HomeHeader from '../common/HomeHeader';

import './Account.css';

class Account extends Component {
   constructor(props){
    super(props);

    this.store = props.store;

    this.state = {
      loading: true,
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
      loading: true,
    });

    //let existingPolls = resetCache ? [] : this.store.getSocialFeed();

    let settings = await WebApi.getUserSettings();
    this.store.setUserSettings(settings);

    this.setState({
      loading: false
    });
  }

  performDeleteAccount(){
    //TODO Account delete endpoint
    alert('No! You stay!');
  }

  get settingsElement(){
    let settings = this.store.getUserSettings();
    console.dir(settings);
    if(Object.keys(settings).length == 0)
      return null;
    else
      return (
        <div className="settingsContainer">
          <div className="settingsHeader">
            <img src={ require('../images/account_icon.png') } /> Account & Settings
          </div>

          <div className="settingsRow">
            <div className="settingsItem">
              Username: <span className="settingsHighlight">{ settings.userName }</span>
            </div>
          </div>

          <div className="settingsRow">
            <div className="settingsItem">
              Polls created: <span className="settingsHighlight">{ settings.pollsCreated }</span>
            </div>

            <div className="settingsItem">
              Polls voted on: <span className="settingsHighlight">{ settings.pollsVotedOn }</span>
            </div>
          </div>

          <div className="settingsRow">
            <div className="settingsItem">
              User for: <span className="settingsHighlight">{ settings.age }</span>
            </div>

            <div className="settingsItem">
              Followers: <span className="settingsHighlight">{ settings.followers }</span>
            </div>
          </div>

          <div className="settingsRow">
            <div className="settingsItem">
              Total points: <span className="settingsHighlight">{ settings.RP }</span>
            </div>

            <div className="settingsItem">
              User ranking: <span className="settingsHighlight">{ settings.userRanking }</span>
            </div>
          </div>

          <span className="accountHeader">Account Removal</span>

          <div className="accountText">
            Decided not to use ClearPoll? We're sorry to see you go! You can delete your account and remove all your profile data.
          </div>
          <div className="accountText">
            Your previous votes will anonymously count towards the poll
            result total for statistical purposes, with no profile attached.
          </div>

          <div className="deleteAccountButton" onClick={() => this.performDeleteAccount()}>
            Delete Account & Profile Data
          </div>

          <div className="accountText">
            <span className="totesImportants">IMPORTANT:</span> This cannot be undone!
          </div>
        </div>
      );
  }

  render() {
    return (
      <div className="accountDetails">
        <LoadingOverlay enabled={ this.state.loading }/>
        <HomeHeader />
        { this.settingsElement }
      </div>
    );
  }
}

export default Account;
