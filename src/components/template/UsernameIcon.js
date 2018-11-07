import React, { Component } from 'react';
import WebApi from '../../models/webApi';

import { withRouter } from 'react-router-dom';

import'./UsernameIcon.css';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = { active: false };
    this.store = props.store;
    this.state = {
      'username': ''
    };
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(resetCache = true){
    let settings = await WebApi.getUserSettings();
    this.store.setUserSettings(settings);
    this.setState({
      'username': this.props.store.data.userSettings.userName
    });

  }

  toggleMenu(visibility){
    this.setState({ active: visibility });
  }

  getUsername(){
    if(!IS_SERVER){
      this.webFetch();
    }
    let settings2 = this.store.getUserSettings();
    return settings2.userName;
  }

  openUrl(url){
    this.setState({ active: false });
    this.props.history.push(url);
  }

  openExternalUrl(url){
    window.location = url;
  }

  touchMenuOpen(){
    //if(this.state.active)
    //  this.toggleMenu(false);
  }

  render() {
    return (
      <div className="usernameContainer"
        >
        <img src={ require("../images/usernameicon.png") } />
        <div className="userNameText">{this.state.username} </div>
        </div>

    );
  }
}

export default withRouter(Menu);
