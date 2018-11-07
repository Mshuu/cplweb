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
