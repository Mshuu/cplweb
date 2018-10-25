import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import HomeHeader from '../common/HomeHeader';
import WalletAddress from './WalletAddress';

import './Rewards.css';

class Rewards extends Component {
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

    let settings = await WebApi.getUserSettings();
    this.store.setUserSettings(settings);

    this.setState({
      loading: false
    });
  }

  get rewardsElement(){
    let settings = this.store.getUserSettings();

    return (
      <div className="rewardsContent">
        <div className="rewardsHeader">
          <img src={ require('../images/rewards_icon.png') } />
          User Rewards
        </div>

        <div className="row">
          <div className="rowItem">
            <div className="itemHeader">Points Received</div>
            <div className="itemValue">{ settings.RP }</div>
            <div className="percentagePoints">{ settings.pointPercentage.toFixed(3) }% of { Math.round(settings.totalPoints).toLocaleString('en')} </div>
            <div className="totalPointsFor">total points for all users</div>
            <div className="itemFooter">

              <div>Points reset at the end of each rewards period.</div>
            </div>
          </div>

          <div className="rowItem">
            <div className="itemHeader">POLL Token Balance</div>
            <div className="itemValue">{ settings.BP }</div>
            <div className="itemFooter">
              <div className="payoutButton">Request Payout</div>
              <div>The minimum payout amount is 50 POLL.</div>
            </div>
          </div>

          <div className="rowItem">
            <div className="itemHeader">Current Multiplier Level</div>
            <div className="itemValue">x{ settings.BM }</div>
            <div className="itemFooter">
              <div>Multiplier levels are based on your existing POLL balance in your wallet and calculated daily.</div>
              <a className="itemLink" href="https://www.clearpoll.com/multiplier" target="_blank">More information.</a>
            </div>
          </div>
        </div>

        <div className="bottomContainer">
          <div className="bottomHeader">Poll Wallet Address</div>

          <div>Your wallet address is where your POLL tokens will be send when you request a payout. It is also the wallet we check for balance to determine your multiplier level.</div>
          <a className="walletButton" href="https://clearpoll.com/beginners-guide-to-creating-a-poll-token-wallet" target="_blank">Get a Wallet</a>

          <WalletAddress />

          <div>
            <span className="important">Important.</span>
            Changing your POLL wallet address after entering it will reset your points for the current period. Your POLL balance will remain.
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="rewardsPage">
        <LoadingOverlay enabled={ this.state.loading }/>
        <HomeHeader />
        { this.rewardsElement }
      </div>
    );
  }
}

export default Rewards;
