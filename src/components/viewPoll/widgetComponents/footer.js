import React, { Component } from 'react';

import './footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="widgetFooter">
        <div className="voteButton" onClick={this.props.onClick}>Vote</div>
      </div>
    );
  }
}

export default Footer;
