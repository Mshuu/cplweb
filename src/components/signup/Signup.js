import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';
import ReactCountryFlag from "react-country-flag";
import  ReactTelInput from 'react-telephone-input';

import "./Signup.css";

function handleInputChange(telNumber, selectedCountry) {
		this.setState({
			phoneNumber: telNumber
		});
}
function handleInputBlur(){

}

class Signup extends Component {
  constructor(props){

    super(props);
    this.props = props;
    this.state = {
      username: '',
      phoneNumber: '',
			countryCode: '',
			country: 'us',
      loading: false,
			'showError': false,
    };

    this.props.store.hydrateCheck();
		this.getFlag();
  }

  async doLogin(){
    if(
      this.state.phoneNumber.length == 0
    ) return;

    this.setState({loading: true});

    try {
      let result = await WebApi.UserSignup(this.state.phoneNumber);

      if(!result) throw new Error("Incorrect username or desktop code");
			if (result.newUser == 'false'){
				this.setState({
					showError: true
				})
			} else {
			this.props.store.setPhoneNumber(result.phoneNumber);

      this.props.history.push('/signup2');
		}
    } catch(e) {
      alert(e.message);
    }

    this.setState({loading: false});
  }
	async getFlag(){
		try {
			let result = await WebApi.GetCountry();
			if(!result) throw new Error("Incorrect username or desktop code");
			console.log(result);
			this.setState({
				countryCode: result.callingCode,
				country: result.country.toLowerCase(),
				phoneNumber: result.callingCode
			})
			console.log(this.state.country);
			this.forceUpdate()

		} catch(e){
			alert(e.message);
		}
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
if (this.state.showError == false){
    return (
      <div className="loginContent">
        <LoadingOverlay enabled={ this.state.loading }/>

        <div className="loginHeader">
          Create a Clearpoll Account
        </div>
				<div className = "signupDesc">
					Please enter your mobile phone number to recieve a 6-digit SMS code
				</div>
				<br />

        <div className="loginField">
          <span className="loginFieldText">
          Mobile
          </span>
          <div className = "InputFlagHolder">
						<ReactTelInput
							defaultCountry = "us"
		 			flagsImagePath={ require('../images/flags.png') }
					onChange={e => this.setState({phoneNumber: e})}
					value = {this.state.phoneNumber}
					preferredCountries={['au', 'us', 'gb']}
					 />
          </div>
					<a  className="faqButton2" href="https://clearpoll.com/faq" target="_blank">
						<img src={ require('../images/question-icon.png')}  className = "faqIcon" />
					</a>
        </div>

        <button className="loginButton" onClick={ this.doLogin.bind(this) }>
          >
        </button>
				<br />
				<div className = "signupDesc">
					We will never send you unsolicited messages or make your personal details available to any third parties.
				</div>
				<div className = "signupDesc">
					<a href="https://www.iubenda.com/privacy-policy/73812586" title="Privacy Policy" target="_blank"><font color = "#ffffff">Privacy Policy</font></a>
				</div>

      </div>
    );
	} else {
		return (
			<div className="loginContent">
				<LoadingOverlay enabled={ this.state.loading }/>

				<div className="loginHeader">
					Create a Clearpoll Account
				</div>
				<div className = "signupDesc">
					Please enter your mobile phone number to recieve a 6-digit SMS code
				</div>
				<br />

				<div className="loginField">
					<span className="loginFieldText">
					Mobile
					</span>
					<div className = "InputFlagHolder">
						<ReactTelInput
							defaultCountry = "us"
		 			flagsImagePath={ require('../images/flags.png') }
					onChange={e => this.setState({phoneNumber: e})}
					value = {this.state.phoneNumber}
					preferredCountries={['au', 'us', 'gb']}
					 />
          </div>
					<a  className="faqButton2" href="https://clearpoll.com/faq" target="_blank">
						<img src={ require('../images/question-icon.png')}  className = "faqIcon" />
					</a>
        </div>

				<button className="loginButton" onClick={ this.doLogin.bind(this) }>
					>
				</button>
				<br />
				<div className = "signupBox">
				<div className = "signupDesc2">
					This mobile number is already linked to a ClearPoll account.
								</div>
								<div className = "signupDesc3">
									To retrieve your login code, install the ClearPoll app and then visit the "Desktop Connect" page in the app menu.
								</div>
							</div>

			</div>
		);
}
  }
}

export default Signup;
