import React, { Component } from 'react';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import WebApi from '../../models/webApi';
import Poll from './poll';
import ShowMore from './ShowMore';

import './PollList.css';

const LOAD_MORE_QTY = 20;

class PollList extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      polls: [],
      loadingMore: true,
      canLoadMore: true
    };
  }

  componentDidMount(){
    if(!IS_SERVER){
      this.webFetch();
    }
  }

  async webFetch(){
    this.setState({
      loadingMore: true,
    });

    let currentPosition = this.state.polls.length;

   let response;

   if (this.props.anon && this.props.anon == 1){
     if (this.props.type == "Star"){
      response = await WebApi.getPollsAnon({
        active: 'true',
        type: 'Star',
        category: 'All',
        sortOrder: 'mostVotes',
        recordStartNo: currentPosition,
        recordQty: LOAD_MORE_QTY
      });
    } else {
     response = await WebApi.getPollsAnon({
       active: 'true',
       type: 'Normal',
       category: this.props.category,
       sortOrder: 'mostVotes',
       recordStartNo: currentPosition,
       recordQty: LOAD_MORE_QTY
     });
 }
   } else {
    if (this.props.type == "Star"){
			response = await WebApi.getPolls({
				active: 'true',
				type: 'Star',
				category: 'All',
				sortOrder: 'mostVotes',
				recordStartNo: currentPosition,
				recordQty: LOAD_MORE_QTY
			});
		} else {
    response = await WebApi.getPolls({
      active: 'true',
      type: 'Normal',
      category: this.props.category,
      sortOrder: 'mostVotes',
      recordStartNo: currentPosition,
      recordQty: LOAD_MORE_QTY
    });
    let advert = await WebApi.FetchAdvert();
    let advert2 = await WebApi.FetchAdvert();
    let advert3 = await WebApi.FetchAdvert();
    let advert4 = await WebApi.FetchAdvert();

    this.setState({
      advert: advert.advert,
      advert2: advert2.advert,
      advert3: advert3.advert,
      advert4: advert4.advert
    });

    if (this.state.advert){
    let newAdvert = {
      category: this.props.category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert.url,
      title: this.state.advert.headline,
      btnText: this.state.advert.btnText
    };
    let newAdvert2 = {
      category: this.props.category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert2.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert2.url,
      title: this.state.advert2.headline,
      btnText: this.state.advert2.btnText
    };
    let newAdvert3 = {
      category: this.props.category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert3.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert3.url,
      title: this.state.advert3.headline,
      btnText: this.state.advert3.btnText
    };
    let newAdvert4 = {
      category: this.props.category,
      isAnon: 1,
      locationFilter: "Global",
      pollActive: "T",
      pollTime: "9948512475",
      pollVotes: 0,
      question: this.state.advert4.text,
      type: "Normal",
      isAdvert: true,
      url: this.state.advert4.url,
      title: this.state.advert4.headline,
      btnText: this.state.advert4.btnText
    };
    response.polls.splice(Math.floor((Math.random() * this.state.polls.length) + 1),1,newAdvert);
    response.polls.splice(Math.floor((Math.random() * this.state.polls.length) + 1),1,newAdvert2);
    response.polls.splice(Math.floor((Math.random() * this.state.polls.length) + 1),1,newAdvert3);
    response.polls.splice(Math.floor((Math.random() * this.state.polls.length) + 1),1,newAdvert4);

  } else {
  }
}

}

    this.setState({
      loading: false,
      loadingMore: false,
      canLoadMore: response.polls && response.polls.length == LOAD_MORE_QTY,
      polls: this.state.polls.concat(response.polls || [])
    });
  }

  get pollElements(){
    return this.state.polls.map( (poll, i) => {
      return (
        <Poll poll={ poll } />
      );
    });
  }

  render() {
    return (
      <div className="pollListContainer">
        <LoadingOverlay enabled={ this.state.loading } fullScreen={ false } />
        <div className="polls">
          { this.pollElements }
        </div>
        {!this.state.loading &&
          <ShowMore moreAvailable={ this.state.canLoadMore } loading={this.state.loadingMore} onClick={() => this.webFetch()} />
        }
      </div>
    );
  }
}

export default PollList;
