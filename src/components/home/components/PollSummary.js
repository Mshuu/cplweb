import React, { Component } from 'react';
import SummaryHeader from './SummaryHeader';
import PollRow from './PollRow';

import './PollSummary.css';

const IMAGE_PATH = '../../images/';
const CATEGORY_MAP = {
  trendingPolls: {title: 'Trending', image: require("../../images/trending_icon.png") },
  endingSoonest: {title: 'Ending Soon', image: require("../../images/trending_icon.png") },
  latestPolls: {title: 'Latest', image: require("../../images/latestPolls_icon.png") },
  starPolls: {title: 'Star Polls', image: require("../../images/starPolls_icon.png"), url: '/starPolls' },
  myVotes: {title: 'My Votes', image: require("../../images/myVotes_icon.png"), url: '/myVotes' },
  localPolls: {title: 'Local', image: require("../../images/local_icon.png") },
  nationalPolls: {title: 'National', image: require("../../images/national_icon.png") },
  socialPolls: {title: 'Friends Voted On...', image: require("../../images/social_icon.png"), url: '/social' },
  politicalPolls: {title: 'Political & Human Rights', image: require("../../images/political_icon.png"), url: '/browse/Pol' },
  humanRightsPolls: {title: 'News & Current Events', image: require("../../images/humanrights_icon.png"), url: '/browse/Hum' },
  lifestylePolls: {title: 'Lifestyle & Health', image: require("../../images/lifestyle_icon.png"), url: '/browse/Lif' },
  sportsPolls: {title: 'Sports, Hobbies & Game', image: require("../../images/sports_icon.png"), url: '/browse/Spo' },
  technologyPolls: {title: 'Business & Finance', image: require("../../images/science_icon.png"), url: '/browse/Tec' },
  environmentPolls: {title: 'Science & Nature', image: require("../../images/environmental_icon.png"), url: '/browse/Env' },
  justForFunPolls: {title: 'Technology & Gadgets', image: require("../../images/justforfun_icon.png"), url: '/browse/Jus' },
  entertainmentPolls: {title: 'Arts & Entertainment', image: require("../../images/entertainment_icon.png"), url: '/browse/Ent' },
  otherPolls: {title: 'Everything Else', image: require("../../images/other_icon.png"), url: '/browse/Oth' },
  randomPolls: {title: 'Random', image: require("../../images/other_icon.png") },
};

class PollSummary extends Component {
  constructor(props){
    super(props);

    this.props = props;
  }

  getPollsFor(category, limit){
    let numOfPolls = this.countPolls(category);

    if(numOfPolls > limit){
      let startIndex = Math.floor(Math.random() * (numOfPolls - limit + 1));
      return this.props.polls[category].slice(startIndex, startIndex + limit);
    } else 
      return this.props.polls[category];
  }

  countPolls(category){
    return this.props.polls[category] ? this.props.polls[category].length : 0;
  }

  getRowFor(category){
    if( this.countPolls(category) > 0 ){
      let details = CATEGORY_MAP[category];

      return (
        <div>
          <SummaryHeader title={ details.title } image={ details.image } url={ details.url } />
          <PollRow polls={ this.getPollsFor(category, 4) } />
        </div>
      );
    }
  }

  render() {
    if(!this.props.polls)
      return <div className="pollSummary"></div>;

    return (
      <div className="pollSummary">
        { this.getRowFor('trendingPolls') }
        { this.getRowFor('endingSoonest') }
        { this.getRowFor('latestPolls') }

        <SummaryHeader title={ "Star Polls" } image={ require("../../images/starPolls_icon.png") } url={ '/starPolls' }/>
        <PollRow polls={ this.getPollsFor('starPolls', 3) } forceNormal={ false } />

        { this.getRowFor('myVotes') }
        { this.getRowFor('localPolls') }
        { this.getRowFor('nationalPolls') }
        { this.getRowFor('socialPolls') }
        { this.getRowFor('politicalPolls') }
        { this.getRowFor('humanRightsPolls') }
        { this.getRowFor('lifestylePolls') }
        { this.getRowFor('sportsPolls') }
        { this.getRowFor('technologyPolls') }
        { this.getRowFor('environmentPolls') }
        { this.getRowFor('justForFunPolls') }
        { this.getRowFor('entertainmentPolls') }
        { this.getRowFor('otherPolls') }
        { this.getRowFor('randomPolls') }
      </div>
    );
  }
}

export default PollSummary;
