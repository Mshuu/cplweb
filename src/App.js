import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Template from './components/template/template.js';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    <BrowserRouter>
      <Template />
    </BrowserRouter>
    );
  }
}

export default App;

ReactDOM.hydrate(<App />, document.getElementById('root'));
