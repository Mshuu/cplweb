import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';

import "./Login.css";

class Login extends Component {
  constructor(props){
    super(props);

    this.props = props;
    this.state = {
      username: '',
      desktopCode: '',
      loading: false
    };

    this.props.store.hydrateCheck();
  }

  async doLogin(){
    if(
      this.state.username.length == 0 ||
      this.state.desktopCode.length == 0
    ) return;

    this.setState({loading: true});

    try {
      let result = await WebApi.login(this.state.username, this.state.desktopCode);

      if(!result) throw new Error("Incorrect username or desktop code");

      if(window.parent){
        window.parent.postMessage({event: "loggedIn"}, '*');
      }

      this.props.history.push('/');
    } catch(e) {
      alert(e.message);
    }

    this.setState({loading: false});
  }

  render() {
    return (
      <div className="loginContent">
        <LoadingOverlay enabled={ this.state.loading }/>

        <div className="loginHeader">
          <img src={ require('./images/desktop-connect.png') } />
          ClearPoll Login
        </div>

        <div className="loginField">
          <span className="loginFieldText">
            Username
          </span>
          <input type="text"
            className="loginFieldUsername"
            value={this.state.username}
            onChange={ e => this.setState({username: e.target.value}) }
          />
        </div>

        <div className="loginField">
          <span className="loginFieldText">
            Desktop Code
          </span>
          <input type="text"
            className="loginFieldDesktopCode"
            value={this.state.desktopCode}
            onChange={ e => this.setState({desktopCode: e.target.value}) }
          />
        </div>

        <div className="loginSubText">
          You can find your code inside the ClearPoll app under "Desktop Connect" in the main menu
        </div>

        <button className="loginButton" onClick={ this.doLogin.bind(this) }>
          Login
        </button>

        <div className="installBanner">
          <div className="installBannerText">
            Not registered? Install ClearPoll app to get started!
          </div>
          <div className="installBannerImages">
            <a href="https://play.google.com/store/apps/details?id=com.nextechdevelopments.clearpoll" target="_blank">
              <img src={ require('../images/google_play_icon.png') }/>
            </a>
            <a href="https://itunes.apple.com/us/app/clearpoll/id1347664374" target="_blank">
              <img src={ require('../images/app_store_icon.svg') }/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
