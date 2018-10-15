import React, { Component } from 'react';
import SummaryHeader from './SummaryHeader';
import PollRow from './PollRow';
import CategoryIcon from '../../common/CategoryIcon';

import './PollSummary.css';

const CATEGORY_MAP = {
  trendingPolls: {title: 'Trending'},
  endingSoonest: {title: 'Ending Soon'},
  latestPolls: {title: 'Latest'},
  starPolls: {title: 'Featured Polls', url: '/starPolls' },
  myVotes: {title: 'My Votes', url: '/myVotes' },
  localPolls: {title: 'Local'},
  nationalPolls: {title: 'National' },
  socialPolls: {title: 'Friends Voted On...', url: '/social' },
  politicalPolls: {title: 'Political & Human Rights', url: '/browse/Pol' },
  humanRightsPolls: {title: 'News & Current Events', url: '/browse/Hum' },
  lifestylePolls: {title: 'Lifestyle & Health', url: '/browse/Lif' },
  sportsPolls: {title: 'Sports, Hobbies & Games', url: '/browse/Spo' },
  technologyPolls: {title: 'Business & Finance', url: '/browse/Tec' },
  environmentPolls: {title: 'Science & Nature', url: '/browse/Env' },
  justForFunPolls: {title: 'Technology & Gadgets', url: '/browse/Jus' },
  entertainmentPolls: {title: 'Arts & Entertainment', url: '/browse/Ent' },
  otherPolls: {title: 'Everything Else', url: '/browse/Oth' },
  randomPolls: {title: 'Random'},
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
          <SummaryHeader title={ details.title } image={ CategoryIcon[details.title] } url={ details.url } />
          <PollRow polls={ this.getPollsFor(category, 5) } />
        </div>
      );
    }
  }

  starPolls(){
    if( this.countPolls('starPolls') > 0 ){
      return (
        <div>
          <SummaryHeader title={ "Featured Polls" } image={ CategoryIcon['Featured Polls'] } url={ '/starPolls' }/>
          <PollRow polls={ this.getPollsFor('starPolls', 3) } forceNormal={ false } />
        </div>
      )
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

        { this.starPolls() }

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
