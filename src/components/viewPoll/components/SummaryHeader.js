import React, { Component } from 'react';

import './SummaryHeader.css';

const IMAGE_PATH = "../../images/";

const CATEGORIES = {

  'Pol': {image: require("../../images/political_icon.png"), title: 'Political'},
  'Env': {image: require("../../images/environmental_icon.png"), title: 'Environmental'},
  'Lif': {image: require("../../images/lifestyle_icon.png"), title: 'LifeStyle'},
  'Hum': {image: require("../../images/humanrights_icon.png"), title: 'Human Rights'},
  'Oth': {image: require("../../images/other_icon.png"), title: 'Other'},
  'All': {image: require("../../images/trending_icon.png"), title: 'All'},
  'Jus': {image: require("../../images/justforfun_icon.png"), title: 'Just For Fun'},
  'Spo': {image: require("../../images/sports_icon.png"), title: 'Sports'},
  'Ent': {image: require("../../images/entertainment_icon.png"), title: 'Entertainment'},
  'Tec': {image: require("../../images/science_icon.png"), title: 'Science & Tech'},
}

class SummaryHeader extends Component {
  constructor(props){
    super(props);

    this.props = props;
  }

  render() {
    let category = CATEGORIES[this.props.category];

    return (
      <div className="pollSummaryHeader">
        <img src={ category.image } />
        <span>{ category.title }</span>
      </div>
    );
  }
}

export default SummaryHeader;
