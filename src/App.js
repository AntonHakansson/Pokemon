import React, { Component } from 'react';
import {Link, hashHistory, IndexRoute, Router, Route} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';


import Nav from './components/Nav';
import HomePage from './components/HomePage';

class App extends Component {
  render(){
    return (
      <MuiThemeProvider>
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Nav}>
              <IndexRoute component={HomePage} />
            </Route>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
