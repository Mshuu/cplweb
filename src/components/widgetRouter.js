import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Store from '../models/store';
import WidgetPoll from './viewPoll/WidgetPoll';

class WidgetRouter extends Component {
  constructor(props){
    super(props);

    this.props = props;
    this.store = props.store || new Store(window.storeData);

    if( typeof window !== 'undefined' && window )
      delete window.storeData;
  }

  render() {
    return (
      <Switch>
        <Route path="/poll/:pollId/widget" render={(props) => <WidgetPoll {...props} store={this.store} />} />
      </Switch>
    );
  }
}

export default withRouter(WidgetRouter);
