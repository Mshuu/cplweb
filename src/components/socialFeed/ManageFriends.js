import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';

class ManageFriends extends Component {
  constructor(props){
    super(props);

    this.store = props.store;

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <div className="manageFriends">

      </div>
    );
  }
}

export default ManageFriends;
