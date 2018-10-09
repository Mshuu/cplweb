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
  constructor(props){
    super(props);

    this.props = props;
  }

  render() {
    let category = CATEGORY_MAP[this.props.category];

		if (this.props.type == "Star"){
    return (
      <div className="pollSummaryHeader">
        <img src={ CategoryIcon["Featured Polls"] } />
        <span>{ "Featured Polls" }</span>
      </div>
    );
	} else {
		return (
			<div className="pollSummaryHeader">
				<img src={ CategoryIcon[category.title] } />
				<span>{ category.title }</span>
			</div>
		);
	}
  }
}

export default SummaryHeader;
