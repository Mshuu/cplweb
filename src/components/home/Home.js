import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import HomeHeader from '../common/HomeHeader';
import PollSummary from './components/PollSummary';

import './Home.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.store = props.store;

    this.state = {
      loading: !IS_SERVER
    };
  }

  componentWillMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(){
    if(this.store.hydrateCheck()){
      return;
    }

    try {
      this.store.data.homePolls = await WebApi.fetchHome();
      this.setState({
        loading: false
      });

    } catch(e){
      console.log('API fail', e);
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="App">
        <LoadingOverlay enabled={ this.state.loading }/>

        <HomeHeader />
        <PollSummary polls={ this.store.data.homePolls }/>
      </div>
    );
  }
}

export default Home;
