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
      username: 'AnonymousCoward',
      desktopCode: 'bsa6jr',
      loading: false
    };

    this.props.store.hydrateCheck();
  }

/*
  async test(){
    let params = {
      function: 'GetDesktopCode',
      phoneNumber: '+61423777097',
      code: '093068'
    }

    let response = await ClearpollApi.request(params);
    console.dir(response);
  }
*/

  async doLogin(){
    this.setState({loading: true});

    try {
      await WebApi.login(this.state.username, this.state.desktopCode);

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
            <img src={ require('../images/google_play_icon.png') }/>
            <img src={ require('../images/app_store_icon.svg') }/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
