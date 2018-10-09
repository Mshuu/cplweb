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
      this.setState({
        loading: false
      });
      return;
    }

    this.setState({
      loading: true
    });

    try {
      this.store.data.homePolls = await WebApi.fetchHome();
      this.setState({
        loading: false
      });

    } catch(e){
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="App">
        <LoadingOverlay enabled={ this.state.loading }/>

        <HomeHeader />
        { !this.state.loading &&
          <PollSummary polls={ this.store.data.homePolls }/>
        }
      </div>
    );
  }
}

export default Home;
