import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';

import "./Signup.css";

class Signup2 extends Component {
  constructor(props){

    super(props);
    this.props = props;
    this.state = {
      username: '',
      phoneNumber: '',
			code: '',
      loading: false
    };

    this.props.store.hydrateCheck();
		this.setState({
			phoneNumber: this.props.store.data.phoneNumber
		});
  }

  async doLogin(){
		    if(
      this.state.code.length == 0 || this.props.store.data.phoneNumber.length == 0
    ) return;
    this.setState({loading: true});

    try {
      let result = await WebApi.UserSignup2(this.props.store.data.phoneNumber,this.state.code);

      if(!result) throw new Error("Incorrect username or desktop code");
			if(result.signupComplete == 'false'){
				this.props.store.setCode(this.state.code);
				this.props.history.push('/signup3');

			} else {
				this.props.history.push('/');
			}

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
          Create a Clearpoll Account
        </div>
				<div className = "signupDesc">
				 Please enter your 6-digit SMS code:
				</div>
				<br />

        <div className="loginField2">
          <span className="loginField2Text">
          SMS Code
          </span>
          <input type="text"
            className="loginField2DesktopCode"
            value={this.state.code}
            onChange={ e => this.setState({code: e.target.value}) }
          />
					<a  className="faqButton" href="https://clearpoll.com/faq" target="_blank">
						<img src={ require('../images/question-icon.png')}  className = "faqIcon" />
					</a>
        </div>

        <button className="loginButton" onClick={ this.doLogin.bind(this) }>
					<img src={ require('../images/next-btn.png')}  className = "nextButton" />
        </button>
				<br />
				<div className = "signupDesc">
				 Not recieving your SMS code? <a href="https://clearpoll.com/faq" target="_blank"><font color="#ffffff">FAQs & Support</font></a>
				</div>

      </div>
    );
  }
}

export default Signup2;
