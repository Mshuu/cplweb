import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import WebApi from './models/webApi';

import WidgetRouter from './components/widgetRouter.js';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    <BrowserRouter>
      <WidgetRouter />
    </BrowserRouter>
    );
  }
}

export default App;

ReactDOM.hydrate(<App />, document.getElementById('root'));
