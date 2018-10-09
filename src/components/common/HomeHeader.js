import React, { Component } from 'react';
import CategoryIcon from './CategoryIcon';
import { withRouter } from 'react-router-dom';

import './HomeHeader.css';

class HomeHeader extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: props.searchText || ''
    };
  }

  doSearch(event){
    if(event && event.key !== 'Enter') return;

    if(this.state.searchText.trim().length > 0)
      this.props.history.push(`/search?q=${this.state.searchText.trim()}`);
  }

  openBrowsePolls(){
    this.props.history.push(`/browse`);
  }

  openStarPolls(){
    this.props.history.push(`/starPolls`);
  }

  openCreateWidget(){
    this.props.history.push(`/createWidget`);
  }

  openSocial(){
    this.props.history.push(`/social`);
  }

  render() {
    return (
      <div className="homeHeader">
        <div className="homeLeft">
          <span className="searchHeader">
            What do you care about?
          </span>

          <div className="searchInputContainer">
            <input type="text"
              className="searchInput"
              placeholder="Search by poll # or keyword"
              value={this.state.searchText}
              onChange={ e => this.setState({searchText: e.target.value}) }
              onKeyPress={e => this.doSearch(e)}
            />
            <span className="searchButton" onClick={() => this.doSearch()}>
              <img className="searchIcon" src={ require('../images/search_icon.png')} />
            </span>
          </div>
        </div>
        <div className="homeRight">
          <div className="headerFeatureButton headerBrowsePolls" onClick={() => this.openBrowsePolls()}>
            <img className="pollIcon" src={ require("../images/vote_icon.png") } />
            <span className="headerFeatureButtonText">Browse Polls</span>
          </div>
          <div className="headerFeatureButton headerCreateWidgets" onClick={() => this.openCreateWidget()}>
            <img className="ratingIcon" src={ require("../images/rating_icon.png") } />
            <span className="headerFeatureButtonText">Create Widgets</span>
          </div>
          <div className="headerFeatureButton headerStarPolls" onClick={() => this.openStarPolls()}>
            <img className="starIcon" src={ CategoryIcon['Star Polls'] } />
            <span className="headerFeatureButtonText">Star Polls</span>
          </div>
          <div className="headerFeatureButton headerSocialPolls" onClick={() => this.openSocial()}>
            <img className="socialIcon" src={ CategoryIcon['Social'] } />
            <span className="headerFeatureButtonText">Social</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeHeader);
