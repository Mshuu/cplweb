import React, { Component } from 'react';
import CategoryIcon from '../../common/CategoryIcon';
import './SummaryHeader.css';

const IMAGE_PATH = "../../images/";

const CATEGORIES = {
  'Pol': {title: 'Political & Human Rights'},
  'Env': {title: 'Science & Nature'},
  'Lif': {title: 'Lifestyle & Health'},
  'Hum': {title: 'News & Current Events'},
  'Oth': {title: 'Everything Else'},
  'All': {title: 'All Categories'},
  'Jus': {title: 'Just For Fun'},
  'Spo': {title: 'Sports, Hobbies & Games'},
  'Ent': {title: 'Arts & Entertainment'},
  'Tec': {title: 'Technology & Gadgets'},
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
        <img src={ CategoryIcon[category.title] } />
        <span>{ category.title }</span>
      </div>
    );
  }
}

export default SummaryHeader;
