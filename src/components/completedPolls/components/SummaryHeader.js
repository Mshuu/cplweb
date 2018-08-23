import React, { Component } from 'react';

import './SummaryHeader.css';

const CATEGORY_MAP = {
  "Pol": { name: "Political & Human Rights", image: require("../../images/political_icon.png") },
  "Hum": { name: "New & Current Events", image: require("../../images/political_icon.png") },
  "Lif": { name: "Lifestyle & Health", image: require("../../images/lifestyle_icon.png") },
  "Ent": { name: "Arts & Entertainment", image: require("../../images/entertainment_icon.png") },
  "Spo": { name: "Sports, Hobbies & Games", image: require("../../images/sports_icon.png") },
  "Tec": { name: "Business & Finance", image: require("../../images/sports_icon.png") },
  "Env": { name: "Science & Nature", image: require("../../images/science_icon.png") },
  "Tec": { name: "Technology & Gadgets", image: require("../../images/science_icon.png") },
  "Oth": { name: "Everything Else", image: require("../../images/science_icon.png") },
  "All": { name: "All Categories", image: require("../../images/science_icon.png") },
  "Star": { name: "Star Polls", image: require("../../images/star_icon.png") },
  "MyVotes": { name: "My Votes", image: require("../../images/myVotes_icon.png") },
  "MyPolls": { name: "My Polls", image: require("../../images/myVotes_icon.png") },
  "Social": { name: "Social", image: require("../../images/social_icon.png") },
};

class SummaryHeader extends Component {
  render() {
    let category = CATEGORY_MAP[this.props.category];

    return (
      <div className="catSummaryHeader">
        <img src={ category.image } />
        <span>{ category.name }</span>
      </div>
    );
  }
}

export default SummaryHeader;
