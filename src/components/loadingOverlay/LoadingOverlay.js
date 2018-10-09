import React, { Component } from 'react';

import './LoadingOverlay.css';

class LoadingOverlay extends Component {
  static defaultProps = {
    fullScreen: true
  }

  constructor(props){
    super(props);

    this.props = props;
  }

  get loadingClassName(){
    if(this.props.fullScreen)
      return this.props.enabled ? "loadingOverlayFullScreen" : "loadingOverlayFullScreen loadingOverlayDisabled";
    else
      return this.props.enabled ? "loadingOverlay" : "loadingOverlay loadingOverlayDisabled";
  }

  render() {
    return (
      <div className={ this.loadingClassName }>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default LoadingOverlay;
