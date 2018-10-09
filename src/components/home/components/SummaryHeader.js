import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './SummaryHeader.css';

class SummaryHeader extends Component {
  onClick(){
    if(this.props.url) this.props.history.push(this.props.url);
  }

  render() {
    return (
      <div className="summaryHeader" onClick={ () => this.onClick() }>
        <img src={ this.props.image } />
        <span>{ this.props.title }</span>
      </div>
    );
  }
}

export default withRouter(SummaryHeader);
