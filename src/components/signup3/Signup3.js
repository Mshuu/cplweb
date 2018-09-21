import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';
import ReCAPTCHA from "react-google-recaptcha";


import "./Signup.css";

class Signup3 extends Component {
  constructor(props){

    super(props);
    this.props = props;
    this.state = {
      username: '',
      phoneNumber: '',
			code: '',
			birthYear: '',
			sex: '',
			userName: '',
      loading: false,
			showError: false,
			recaptcha: null
    };

    this.props.store.hydrateCheck();
		this.setState({
			phoneNumber: this.props.store.data.phoneNumber,
			"recaptcha": null
		});
  }
async setFemale(){
	this.setState({
		sex: 'f'
	});
}
async setMale(){
	this.setState({
		sex: 'm'
	});
}
handleChange = value => {
	 console.log("Captcha value:", value);
	 this.setState({ 'recaptcha': value });
 };

async doUsername(){
	if (
		this.state.userName.length == 0
	) return;

	this.setState({loading: true});

	try {
		let result = await WebApi.CheckUsername(this.state.userName);

		if(!result) throw new Error("Incorrect username or desktop code");
		console.log(result);
	if (result.usernameTaken == 'true'){
		console.log("yaken");
		this.setState({
			showError: true
		});
	} else {
		console.log("notakens");
		this.setState({
			showError: false
		});
		this.doLogin.bind(this);
	}
	console.log("this:" + this.state.showError);

	} catch(e) {
		alert(e.message);
	}

	this.setState({loading: false});
}

  async doLogin(){
		console.log("HERE");
		console.log("VLUE: %j", this.state.recaptcha);

		    if(
      this.props.store.data.code.length == 0 || this.props.store.data.phoneNumber.length == 0 || this.state.birthYear.length == 0 || this.state.sex.length == 0 || this.state.userName.length == 0 || this.state.recaptcha == null
    ) return;
		console.log("HERE2");

    this.setState({loading: true});

    try {
      let result = await WebApi.UserSignup3(this.props.store.data.phoneNumber,this.props.store.data.code,this.state.birthYear,this.state.sex,this.state.userName);

      if(!result) throw new Error("Incorrect username or desktop code");
			console.log(result);
			if(result.success == 'true' && result.signupComplete == 'true'){
				try {
					let result2 = await WebApi.SendStat(this.state.username);
					this.props.store.setUsername(this.state.userName);
					this.props.history.push('/finishSignup');
				} catch (e) {
					alert(e.message);
				}

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
		if (this.state.showError == false){
if (this.state.sex == ''){
    return (
      <div className="loginContent">
        <LoadingOverlay enabled={ this.state.loading }/>

        <div className="loginHeader">
          Create a Clearpoll Account
        </div>
				<div className = "signupDesc2">
				 Tell us a little about yourself...
				</div>
				<div className = "signupDesc">
				 Don't worry, no personal information will be made public.
				</div>
				<br />

        <div className="loginField2">
          <span className="loginField2Text">
          Birth Year
          </span>
          <input type="text"
            className="loginField2DesktopCode"
            value={this.state.birthYear}
            onChange={ e => this.setState({birthYear: e.target.value}) }
          />
        </div>
				<div className="SexButtons">
				<button className="sexButton" onClick={ this.setMale.bind(this) }>
					 Male
					</button>
						<button className="sexButton3" onClick={ this.setFemale.bind(this)  }>
							Female
							</button>
						</div>

				<div className="loginField2">
					<span className="loginField2Text">
					Username
					</span>
					<input type="text"
						className="loginField2DesktopCode"
						value={this.state.userName}
						onChange={ e => this.setState({userName: e.target.value}) }
					/>
				</div>
        <ReCAPTCHA
  sitekey="6LebY3EUAAAAAF-uUe5N2wNV7G2sPotP-XGDwJ7G"
  onChange={this.handleChange}
	style ={{"margin-top": "10px"}}
/>

				<button className="loginButton" onClick={ this.doUsername.bind(this) }>
					<img src={ require('../images/next-btn.png')}  className = "nextButton" />
        </button>

      </div>
    );
	} else if (this.state.sex == 'm'){
		return (
			<div className="loginContent">
				<LoadingOverlay enabled={ this.state.loading }/>

				<div className="loginHeader">
					Create a Clearpoll Account
				</div>
				<div className = "signupDesc2">
				 Tell us a little about yourself...
				</div>
				<div className = "signupDesc">
				 Don't worry, no personal information will be made public.
				</div>
				<br />

				<div className="loginField2">
					<span className="loginField2Text">
					Birth Year
					</span>
					<input type="text"
						className="loginField2DesktopCode"
						value={this.state.birthYear}
						onChange={ e => this.setState({birthYear: e.target.value}) }
					/>
				</div>
				<div className="SexButtons">
				<button className="sexButton2" onClick={ this.setMale.bind(this) } >
					 Male
					</button>
						<button className="sexButton3" onClick={ this.setFemale.bind(this)  }>
							Female
							</button>
						</div>

				<div className="loginField2">
					<span className="loginField2Text">
					Username
					</span>
					<input type="text"
						className="loginField2DesktopCode"
						value={this.state.userName}
						onChange={ e => this.setState({userName: e.target.value}) }
					/>
				</div>
				<ReCAPTCHA
  sitekey="6LebY3EUAAAAAF-uUe5N2wNV7G2sPotP-XGDwJ7G"
  onChange={this.handleChange}
	style ={{"margin-top": "10px"}}
/>
				<button className="loginButton" onClick={ this.doUsername.bind(this) }>
					<img src={ require('../images/next-btn.png')}  className = "nextButton" />
        </button>

			</div>
		);
	} else if (this.state.sex == 'f'){
		return (
			<div className="loginContent">
				<LoadingOverlay enabled={ this.state.loading }/>

				<div className="loginHeader">
					Create a Clearpoll Account
				</div>
				<div className = "signupDesc2">
				 Tell us a little about yourself...
				</div>
				<div className = "signupDesc">
				 Don't worry, no personal information will be made public.
				</div>
				<br />

				<div className="loginField2">
					<span className="loginField2Text">
					Birth Year
					</span>
					<input type="text"
						className="loginField2DesktopCode"
						value={this.state.birthYear}
						onChange={ e => this.setState({birthYear: e.target.value}) }
					/>
				</div>
				<div className="SexButtons">
				<button className="sexButton" onClick={this.setMale.bind(this)  }>
					 Male
					</button>
						<button className="sexButton4" onClick={ this.setFemale.bind(this)  }>
							Female
							</button>
						</div>

				<div className="loginField2">
					<span className="loginField2Text">
					Username
					</span>
					<input type="text"
						className="loginField2DesktopCode"
						value={this.state.userName}
						onChange={ e => this.setState({userName: e.target.value}) }
					/>
				</div>
				<ReCAPTCHA
  sitekey="6LebY3EUAAAAAF-uUe5N2wNV7G2sPotP-XGDwJ7G"
  onChange={this.handleChange}
	style ={{"margin-top": "10px"}}
/>
				<button className="loginButton" onClick={ this.doUsername.bind(this) }>
					<img src={ require('../images/next-btn.png')}  className = "nextButton" />
        </button>

			</div>
		);
	}
} else {
	if (this.state.sex == ''){
	    return (
	      <div className="loginContent">
	        <LoadingOverlay enabled={ this.state.loading }/>

	        <div className="loginHeader">
	          Create a Clearpoll Account
	        </div>
					<div className = "signupDesc2">
					 Tell us a little about yourself...
					</div>
					<div className = "signupDesc">
					 Don't worry, no personal information will be made public.
					</div>
					<br />

	        <div className="loginField2">
	          <span className="loginField2Text">
	          Birth Year
	          </span>
	          <input type="text"
	            className="loginField2DesktopCode"
	            value={this.state.birthYear}
	            onChange={ e => this.setState({birthYear: e.target.value}) }
	          />
	        </div>
					<div className="SexButtons">
					<button className="sexButton" onClick={ this.setMale.bind(this) }>
						 Male
						</button>
							<button className="sexButton3" onClick={ this.setFemale.bind(this)  }>
								Female
								</button>
							</div>

					<div className="loginField2">
						<span className="loginField2Text">
						Username
						</span>
						<input type="text"
							className="loginField2DesktopCode"
							value={this.state.userName}
							onChange={ e => this.setState({userName: e.target.value}) }
						/>
					</div>
					<div className = "ErrorText">
						<div className = "errorText">
						 Username taken. Please try a different one.
						</div>
					</div>
					<ReCAPTCHA
	  sitekey="6LebY3EUAAAAAF-uUe5N2wNV7G2sPotP-XGDwJ7G"
	  onChange={this.handleChange}
		style ={{"margin-top": "10px"}}
	/>
					<button className="loginButton" onClick={ this.doUsername.bind(this) }>
						<img src={ require('../images/next-btn.png')}  className = "nextButton" />
	        </button>

	      </div>
	    );
		} else if (this.state.sex == 'm'){
			return (
				<div className="loginContent">
					<LoadingOverlay enabled={ this.state.loading }/>

					<div className="loginHeader">
						Create a Clearpoll Account
					</div>
					<div className = "signupDesc2">
					 Tell us a little about yourself...
					</div>
					<div className = "signupDesc">
					 Don't worry, no personal information will be made public.
					</div>
					<br />

					<div className="loginField2">
						<span className="loginField2Text">
						Birth Year
						</span>
						<input type="text"
							className="loginField2DesktopCode"
							value={this.state.birthYear}
							onChange={ e => this.setState({birthYear: e.target.value}) }
						/>
					</div>
					<div className="SexButtons">
					<button className="sexButton2" onClick={ this.setMale.bind(this) } >
						 Male
						</button>
							<button className="sexButton3" onClick={ this.setFemale.bind(this)  }>
								Female
								</button>
							</div>

					<div className="loginField2">
						<span className="loginField2Text">
						Username
						</span>
						<input type="text"
							className="loginField2DesktopCode"
							value={this.state.userName}
							onChange={ e => this.setState({userName: e.target.value}) }
						/>
					</div>
					<div className = "ErrorText">
						<div className = "errorText">
						 Username taken. Please try a different one.
						</div>
					</div>
					<ReCAPTCHA
	  sitekey="6LebY3EUAAAAAF-uUe5N2wNV7G2sPotP-XGDwJ7G"
	  onChange={this.handleChange}
		style ={{"margin-top": "10px"}}
	/>
					<button className="loginButton" onClick={ this.doUsername.bind(this) }>
						<img src={ require('../images/next-btn.png')}  className = "nextButton" />
	        </button>

				</div>
			);
		} else if (this.state.sex == 'f'){
			return (
				<div className="loginContent">
					<LoadingOverlay enabled={ this.state.loading }/>

					<div className="loginHeader">
						Create a Clearpoll Account
					</div>
					<div className = "signupDesc2">
					 Tell us a little about yourself...
					</div>
					<div className = "signupDesc">
					 Don't worry, no personal information will be made public.
					</div>
					<br />

					<div className="loginField2">
						<span className="loginField2Text">
						Birth Year
						</span>
						<input type="text"
							className="loginField2DesktopCode"
							value={this.state.birthYear}
							onChange={ e => this.setState({birthYear: e.target.value}) }
						/>
					</div>
					<div className="SexButtons">
					<button className="sexButton" onClick={this.setMale.bind(this)  }>
						 Male
						</button>
							<button className="sexButton4" onClick={ this.setFemale.bind(this)  }>
								Female
								</button>
							</div>

					<div className="loginField2">
						<span className="loginField2Text">
						Username
						</span>
						<input type="text"
							className="loginField2DesktopCode"
							value={this.state.userName}
							onChange={ e => this.setState({userName: e.target.value}) }
						/>
					</div>
					<div className = "ErrorText">
						<div className = "errorText">
						 Username taken. Please try a different one.
						</div>
					</div>
					<ReCAPTCHA
	  sitekey="6LebY3EUAAAAAF-uUe5N2wNV7G2sPotP-XGDwJ7G"
	  onChange={this.handleChange}
		style ={{"margin-top": "10px"}}
	/>
					<button className="loginButton" onClick={ this.doUsername.bind(this) }>
						<img src={ require('../images/next-btn.png')}  className = "nextButton" />
	        </button>

				</div>
			);
		}
}
  }
}

export default Signup3;
