import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import  CryptoJS from "crypto-js";
import LoginSignupIcon from './LoginSignupIcon';
import Menu from './Menu';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Signup2 from '../signup2/Signup2';
import Signup3 from '../signup3/Signup3';
import FinishSignup from '../finishSignup/FinishSignup';
import Home from '../home/Home';
import ViewPoll from '../viewPoll/ViewPoll';
import Search from '../search/Search';
import CompletedPolls from '../completedPolls/CompletedPolls';
import StarPolls from '../starPolls/StarPolls';
import MyVotes from '../myVotes/MyVotes';
import MyPolls from '../myPolls/MyPolls';
import SocialFeed from '../socialFeed/SocialFeed';
import ManageFriends from '../socialFeed/ManageFriends';
import Account from '../account/Account';
import CreateWidget from '../createWidget/CreateWidget';
import Rewards from '../rewards/Rewards';
import Store from '../../models/store';
import UsernameIcon from './UsernameIcon';

import * as qs from 'query-string';

import './template.css';

class Template extends Component {
  constructor(props){
    super(props);

    this.props = props;

    this.store = props.store || new Store(window.storeData);

    if( typeof window !== 'undefined' && window )
      delete window.storeData;



    let params = qs.parse(props.location.search);

    this.storeContext = React.createContext(this.store);
    this.embedded = params.embedded ? true : false;
  }

  handleLogoClick(){
    this.store.getAuthenticated() ? this.props.history.push(`/`) : this.props.history.push(`/login`);
  }

  handleContactClick(){
    window.location = 'https://clearpoll.com/'; // TODO - Change me!
  }

  get showMenu(){
    return this.store.getAuthenticated() && this.props.location.pathname != '/login';
  }

  get showLogin(){
    return !this.store.getAuthenticated() && this.props.location.pathname != '/login';
  }

  render() {
    return (
      <div className="templateContainer">
        <div className="templateInnerContainer">
          { !this.embedded &&
            <div className="templateHeader">
              <img src={ require("../images/ClearPoll-Logo.png") } onClick={() => this.handleLogoClick()}/>
              { this.showMenu && <UsernameIcon store={this.store}/>}
              { this.showLogin && <LoginSignupIcon store ={this.store}/>}
              { this.showMenu && <Menu /> }
            </div>
          }
          <Switch>
            <Route path="/rewards" render={(props) => <Rewards {...props} store={this.store} />} />
            <Route path="/createWidget" render={(props) => <CreateWidget {...props} store={this.store} />} />
            <Route path="/completed/:category?" render={(props) => <CompletedPolls {...props} store={this.store} />} />
            <Route path="/browse/:category?" render={(props) => <CompletedPolls {...props} store={this.store} />} />
            <Route path="/FeaturedPolls" render={(props) => <StarPolls {...props} store={this.store} />} />
            <Route path="/myVotes" render={(props) => <MyVotes {...props} store={this.store} />} />
            <Route path="/myPolls" render={(props) => <MyPolls {...props} store={this.store} />} />
            <Route path="/social/manageFriends" render={(props) => <ManageFriends {...props} store={this.store} />} />
            <Route path="/social" render={(props) => <SocialFeed {...props} store={this.store} />} />
            <Route path="/account" render={(props) => <Account {...props} store={this.store} />} />
            <Route path="/search" render={(props) => <Search {...props} store={this.store} />} />
            <Route path="/poll/:pollId" render={(props) => <ViewPoll {...props} store={this.store} />} />
            <Route path="/login" render={(props) => <Login {...props} store={this.store} />} />
						<Route path="/signup" render = {(props) => <Signup {...props} store={this.store} />} />
						<Route path="/signup2" render = {(props) => <Signup2 {...props} store={this.store} />} />
						<Route path="/signup3" render = {(props) => <Signup3 {...props} store={this.store} />} />
						<Route path="/finishSignup" render = {(props) => <FinishSignup {...props} store={this.store} />} />
            <Route path="/" render={(props) => <Home {...props} store={this.store} />} />
          </Switch>
        </div>
        <div className="templateFooter">
          <span style={{ cursor: 'pointer'}} onClick={ () => this.handleContactClick() }> Contact Us</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Template);
