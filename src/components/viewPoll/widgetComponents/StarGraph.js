import React, { Component } from 'react';

import './StarGraph.css';

class StarGraph extends Component {
  constructor(props){
    super(props);

    let selectedAnswer = this.props.userAnswer ? Number(this.props.userAnswer.answerText) : null;
 
    console.dir(this.props.userAnswer);

    this.state = {
      lockToAnswer: (selectedAnswer > 0),
      mouseOver: false,
      mouseStarPosition: (selectedAnswer > 0 ? selectedAnswer-1 : 0)
    }
  }

  get highlightWidth(){
    let spaceOffset = 10 * Math.floor(this.props.averageRating);
    return spaceOffset + 88 * this.props.averageRating;
  }

  onMouseMove(e){
    if(this.state.lockToAnswer) return;

    let currentTargetRect = e.currentTarget.getBoundingClientRect();

    const percentageHorizontal = 100 * (e.pageX - currentTargetRect.left) / currentTargetRect.width;
    this.setState({mouseStarPosition: Math.floor(percentageHorizontal / 10.0)});
  }

  get mousePointer(){
    if(!this.state.mouseOver && !this.state.lockToAnswer) return;

    const startOffset = 35;
    const spacingOffset = 98;
    const xPosition = startOffset + this.state.mouseStarPosition * spacingOffset;

    return (
      <polygon
        points="48,13.7 24,0 0,13.7 "
        fill="#EF7244"
        transform={ `translate(${ xPosition },83)` }
      />
    );
  }

  onClick(){
    this.props.onClick(this.state.mouseStarPosition + 1);
  }

  toggleMousePointer(enable){
    this.setState({ mouseOver: enable });
  }

  render() {
    return (
      <svg id="Layer_1" viewBox={'0 0 1000 100'} className="starGraph"
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseOver={() => this.toggleMousePointer(true)}
        onMouseOut={() => this.toggleMousePointer(false)}
        onClick={this.onClick.bind(this)}
        >
        <rect
          x='15'
          y='0'
          width={ this.highlightWidth }
          height="95"
          fill="#06bfc1" 
        />
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          y1={121.5}
          x2={1000}
          y2={121.5}
          gradientTransform="translate(0 -73)"
        >
          <stop offset={0} id="stop3813" stopColor="#450069" />
          <stop offset={0.326} id="stop3815" stopColor="#352888" />
          <stop offset={0.662} id="stop3817" stopColor="#3e4da2" />
          <stop offset={1} id="stop3819" stopColor="#2586b3" />
        </linearGradient>
        <path
          d="M0 0v91c0 3.3 2.7 6 6 6h988c3.3 0 6-2.7 6-6V0zm101.4 40.8L80.1 60.5 85.8 89c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2L58.6 76.2 33.3 90.4c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4L57.5 8.8c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4zm98 0l-21.3 19.7 5.7 28.5c.1.5-.1 1-.5 1.3-.2.2-.5.3-.8.3-.2 0-.4-.1-.6-.2l-25.3-14.2-25.3 14.2c-.5.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l5.7-28.5-21.3-19.7c-.4-.4-.5-.9-.4-1.4.2-.5.6-.8 1.1-.9l28.8-3.4 12.2-26.3c.2-.5.7-.8 1.2-.8s1 .3 1.2.8l12.2 26.3 28.8 3.4c.5.1.9.4 1.1.9-.1.5-.2 1.1-.6 1.4z"
          id="path3822"
          fill="url(#SVGID_1_)"
        />
        { this.mousePointer }
      </svg>
    );
  }
}

export default StarGraph;

