import React, { Component } from 'react';

import './header.css';

class Header extends Component {
  constructor(props){
    super(props);

    this.props = props;
  }

  render() {

    return (
      <div>
        <div className="widgetHeader">
          <img className="logo" src={ require('../../images/clearpoll_logo_white.png') } />
        </div>
        <div className="widgetHeaderDetails">
          <div>
            <img src={ require('../../images/poll_tick_icon.png') } />
            { this.props.pollVotes }
          </div>
          <div>
            <img src={ require('../../images/poll_hash_icon.png') } />
            { this.props.pollId }
          </div>
          <div>
            <img src={ require('../../images/poll_clock_icon.png') } />
            { this.props.pollTime }
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
