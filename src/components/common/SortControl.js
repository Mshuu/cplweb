import React, { Component } from 'react';

import './SortControl.css';

const OPTIONS = [
  {name: "Most Votes", value: "mostVotes"},
  {name: "Ending Soon", value: "endingSoonest"},
  {name: "Newest", value: "newest"},
];

class SortControl extends Component {
  constructor(props){
    super(props);

    let startingOrder = OPTIONS.find(item => item.value == this.props.sortOrder).name;
    this.state = {
      sortOrder: startingOrder,
      listOpen: false
    };
  }

  toggleList(visibility){
    this.setState({
      listOpen: visibility
    });
  }

  setSelected(item){
    this.props.onChange(item.value);

    this.setState({
      listOpen: false,
      sortOrder: item.name
    });
  }

  get listElements(){
    let className = this.state.listOpen ? "sortList" : "sortListDisabled";

    return (
      <ul className={ className }>
       {OPTIONS.map((item, i) => (
         <li className="sortListItem" key={i} onClick={() => this.setSelected(item)}>{item.name}</li>
        ))}
      </ul>
    );
  }

  render(){
    return (
      <div className="sortListWrapper"  onMouseOver={() => this.toggleList(true)} onMouseOut={() => this.toggleList(false)}>
        <div className="sortListHeader">
          <div className="sortListTitle">
            { this.state.sortOrder }
            <img src={require('../images/sort_icon.png')} />
          </div>
        </div>
        { this.listElements }
      </div>
    )
  }
}

export default SortControl;
