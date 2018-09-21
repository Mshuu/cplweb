import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';

import "./Signup.css";




class FinishSignup extends Component {
  constructor(props){

    super(props);
    this.props = props;
    this.state = {
      username: '',
      phoneNumber: '',
			desktopCode: '',
			code: '',
			birthYear: '',
			sex: '',
			userName: '',
      loading: false
    };

    this.props.store.hydrateCheck();
		this.setState({
			phoneNumber: this.props.store.data.phoneNumber
		});
		this.getCode();
  }

	async getCode(){
		try {
			let result = await WebApi.GetDesktopCode(this.props.store.data.phoneNumber,this.props.store.data.code);
		  if(!result) throw new Error("Incorrect username or desktop code");
			if (result.success){
				this.setState({
					desktopCode: result.desktopCode
				})
			}
		} catch(e) {
			alert(e.message);
		}
	}

		async doLogin(){
			if(
				this.props.store.data.username.length == 0 ||
				this.state.desktopCode.length == 0
			) return;

			this.setState({loading: true});

			try {
				let result = await WebApi.login(this.props.store.data.username, this.state.desktopCode);

				if(!result) throw new Error("Incorrect username or desktop code");

				if(window.parent){
					window.parent.postMessage({event: "loggedIn"}, '*');
					this.props.store.setAuthenticated(true);
				}

				this.props.history.push('/');
			} catch(e) {
				alert(e.message);
			}

			this.setState({loading: false});
		}

	async doSignup(){

		this.setState({loading: true});

		try {


			this.props.history.push('/Signup');
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
          ClearPoll Account Created!
        </div>
				<div className = "signupDesc2">
				 Your unique login code is
				</div>
				<br />

        <div className="loginField2">
          <input type="text"
            className="loginFieldDesktopCode"
            value={this.state.desktopCode}
          />
        </div>

        <button className="loginButton" onClick={ this.doLogin.bind(this) }>
          Login
        </button>
					<div className="nonImportantText">
						<font color="#01bec0">IMPORTANT: </font> DO NOT LOSE THIS CODE.
					</div>
				<div className = "signupDesc">
				 You will need it, along with your username, everytime you login to ClearPoll.
				</div>
				<div className = "signupDesc1">
					Remember it, write it down, email it to yourself if you wish. Please keep it handy!
				</div>

      </div>
    );
  }
}

export default FinishSignup;
