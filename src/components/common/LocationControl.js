import React, { Component } from 'react';

import './LocationControl.css';

const OPTIONS = [
  'Global',
  'National',
  'Local'
];

class LocationControl extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: OPTIONS.indexOf(this.props.defaultLocation)
    };
  }

  changeSelected(index){
    this.setState({selected: index});
    this.props.onChange(OPTIONS[index]);
  }

  get optionElements(){
    return OPTIONS.map( (option, i) => {
      let className = i == this.state.selected ? 'selected' : 'unselected';

      return (
        <div key={ i } className={ className } onClick={ () => this.changeSelected(i) }> 
          { option }
        </div>
      );
    });
  }

  render(){
    return (
      <div className="locationListWrapper">
        { this.optionElements }
      </div>
    )
  }
}

export default LocationControl;
