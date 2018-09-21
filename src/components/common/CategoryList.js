import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryIcon from './CategoryIcon';

import './CategoryList.css';

const CATEGORIES = [
  {name: "Political & Human Rights", shortName: "Pol", color: '#7776be'},
  {name: "News & Current Events", shortName: "Hum", color: '#8a9dbe'},
  {name: "Lifestyle & Health", shortName: "Lif", color: '#f0718c'},
  {name: "Arts & Entertainment", shortName: "Ent", color: '#ef7245'},
  {name: "Sports, Hobbies & Games", shortName: "Spo", color: '#cdc034'},
  {name: "Business & Finance", shortName: "Tec", color: '#0581aa'},
  {name: "Science & Nature", shortName: "Env", color: '#7eca6f'},
  {name: "Technology & Gadgets", shortName: "Jus", color: '#c85297'},
  {name: "Everything Else", shortName: "Oth", color: '#5693d1'},
  {name: "All Categories", shortName: "All", color: '#01bec0'},
];

/*
+----------+
| category |
+----------+
| Spo      |
| Pol      |
| Lif      |
| Hum      |
| Ent      |
| Tec      |
| Env      |
| Jus      |
| Oth      |
| All      |
+----------+

*/

class CategoryList extends Component {
  openCategory(shortName){
    this.props.history.push(`/${this.props.basePath}/${shortName}`);
  }

  get categoryElements(){
    console.dir(CATEGORIES);
    return CATEGORIES.map((category, i) => {
      return (
        <div
          className="category"
          key={ i }
          style={{backgroundColor: category.color}}
          onClick={ () => this.openCategory(category.shortName) }
        >
          <span className="categoryImage"><img src={ CategoryIcon[category.shortName + '_browse'] } /></span>
          <span>{ category.name }</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="categoryList">
        { this.categoryElements }
      </div>
    );
  }
}

export default withRouter(CategoryList);
