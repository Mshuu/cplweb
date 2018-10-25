import React, { Component } from 'react';
import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';

class WalletAddress extends Component {
  constructor(props){
    super(props);

    this.state = { loading: false, ethAddress: null };
  }

  async componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(){
    this.setState({loading: true});

    let response = await WebApi.getWalletAddress();
    this.setState({ ethAddress: response.wallet });

    this.setState({loading: false});
  }

  async saveAddress(){
    this.setState({loading: true});

    let response = await WebApi.saveWalletAddress(this.state.ethAddress);
    if(!response.success) alert(response.error);

    this.setState({loading: false});
  }

  render(){
    return (
      <div className="addressField">
        <LoadingOverlay enabled={ this.state.loading }/>

        <span>Address</span>
        <input type="text"
          placeholder="POLL wallet address"
          value={this.state.ethAddress}
          onChange={ e => this.setState({ethAddress: e.target.value.trim()}) }
        />
        <span className="saveButton" onClick={() => this.saveAddress()} >
          <img src={ require('../images/save_icon.png') } />
        </span>
      </div>
    )
  }
}

export default WalletAddress;
