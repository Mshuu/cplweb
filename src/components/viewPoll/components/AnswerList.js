import React, { Component } from 'react';
import COLORS from '../../common/colors';

import './AnswerList.css';

class AnswerList extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  onVote(answer){
    this.props.onVote(answer);
  }

  render() {
    let answerElements = this.props.answers.map( (answer, index) => {
      return (
        <div className="answer" key={ index } style={{ backgroundColor: COLORS[index] }} onClick={ () => this.onVote(answer) }>
          { answer }
        </div>
      );
    });

    return (
      <div style={{ display: 'flex' }}>
        <div className="answersContainer">
          { answerElements }
        </div>
        <div className="answersSpacer" />
      </div>
    );
  }
}

export default AnswerList;
