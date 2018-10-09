import React, { Component } from 'react';
import Poll from '../../common/poll';

import './PollRow.css';

class PollRow extends Component {
  static defaultProps = {
    forceNormal: true
  };

  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    let pollElements = this.props.polls.map( poll => {
      return (
        <Poll key={ poll.id } poll={ poll } forceNormal={this.props.forceNormal} />
      );
    });

    return (
      <div className="pollRow">
        { pollElements }
      </div>
    );
  }
}

export default PollRow;
