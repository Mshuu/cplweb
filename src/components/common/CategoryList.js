import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './CategoryList.css';

const CATEGORIES = [
  {name: "Political & Human Rights", shortName: "Pol", image: require("../images/political_icon.png"), color: '#7776be'},
  {name: "New & Current Events", shortName: "Hum", image: require("../images/political_icon.png"), color: '#8a9dbe'},
  {name: "Lifestyle & Health", shortName: "Lif", image: require("../images/lifestyle_icon.png"), color: '#f0718c'},
  {name: "Arts & Entertainment", shortName: "Ent", image: require("../images/entertainment_icon.png"), color: '#ef7245'},
  {name: "Sports, Hobbies & Games", shortName: "Spo", image: require("../images/sports_icon.png"), color: '#cdc034'},
  {name: "Business & Finance", shortName: "Tec", image: require("../images/sports_icon.png"), color: '#0581aa'},
  {name: "Science & Nature", shortName: "Env", image: require("../images/science_icon.png"), color: '#7eca6f'},
  {name: "Technology & Gadgets", shortName: "Tec", image: require("../images/science_icon.png"), color: '#c85297'},
  {name: "Everything Else", shortName: "Oth", image: require("../images/science_icon.png"), color: '#5693d1'},
  {name: "All Categories", shortName: "All", image: require("../images/science_icon.png"), color: '#01bec0'},
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
          <span className="categoryImage"><img src={ category.image } /></span>
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


/*
endingSoonest
:
[{…}]
entertainmentPolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
environmentPolls
:
(2) [{…}, {…}]
friendRequestPending
:
"false"
humanRightsPolls
:
(3) [{…}, {…}, {…}]
id
:
2
justForFunPolls
:
(17) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
latestPolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
lifestylePolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
localPolls
:
[]
myPolls
:
[]
myVotes
:
(6) [{…}, {…}, {…}, {…}, {…}, {…}]
nationalPolls
:
[]
otherPolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
politicalPolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
randomPolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
socialPolls
:
[]
sponsoredPolls
:
[]
sportsPolls
:
(12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
starPolls
:
[]
success
:
"true"
technologyPolls
:
(3) [{…}, {…}, {…}]
time
:
1533563421
trendingPolls
:
(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
voteHistory

*/
