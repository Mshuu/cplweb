import React, { Component } from 'react';

import './ShowMore.css';

class ShowMore extends Component {
  render(){
    if(!this.props.moreAvailable)
      return null;

    if(this.props.loading){
      return (
        <div className="showMore">
          Loading...
        </div>
      );
    } else {
      return (
        <div className="showMore" onClick={ () => this.props.onClick() }>
          Show more
        </div>
      );
    }
  }
}

export default ShowMore;
