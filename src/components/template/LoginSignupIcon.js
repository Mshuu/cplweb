import React, { Component } from 'react';
import WebApi from '../../models/webApi';

import { withRouter } from 'react-router-dom';

import'./LoginSignupIcon.css';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = { active: false };
    this.store = props.store;
    this.state = {
      'username': ''
    };
  }

  toggleMenu(visibility){
    this.setState({ active: visibility });
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
  sendLogin(){
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="loginSignupIcon"
      onClick={() => this.sendLogin()}
        >
        <img src={ require("../images/usernameicon.png") } />
        <div className="loginSignupIcontext">Login or Sign Up </div>
        </div>

    );
  }
}

export default withRouter(Menu);
