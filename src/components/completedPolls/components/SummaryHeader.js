import React, { Component } from 'react';
import CategoryIcon from '../../common/CategoryIcon';

import './SummaryHeader.css';

const CATEGORY_MAP = {
  'Pol': {title: 'Political & Human Rights'},
  'Env': {title: 'Science & Nature'},
  'Lif': {title: 'Lifestyle & Health'},
  'Hum': {title: 'News & Current Events'},
  'Oth': {title: 'Everything Else'},
  'All': {title: 'All Categories'},
  'Jus': {title: 'Technology & Gadgets'},
  'Spo': {title: 'Sports, Hobbies & Games'},
  'Ent': {title: 'Arts & Entertainment'},
  'Tec': {title: 'Business & Finance'},

  "All": { title: "All Categories" },
  "Star": { title: "Featured Polls" },
  "MyVotes": { title: "My Votes" },
  "MyPolls": { title: "My Polls" },
  "Social": { title: "Social" },
};

class SummaryHeader extends Component {
  render() {
    let category = CATEGORY_MAP[this.props.category];

    return (
      <div className="catSummaryHeader">
        <img src={ CategoryIcon[category.title] } />
        <span>{ category.title }</span>
      </div>
    );
  }
}

export default SummaryHeader;
