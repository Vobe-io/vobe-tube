import React, { Component } from 'react';
import Sidebar from 'components/Sidebar';
import 'style/master.sass';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Favorites from 'sites/Favorites';
import Watched from 'sites/Watched';
import Downloads from 'sites/Downloads';
import Settings from 'sites/Settings';
import Profile from 'sites/Profile';
import Status from 'sites/Status'
import Home from 'sites/Home';
import APIService from 'scripts/APIService';

export const api = new APIService();

class App extends Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Sidebar />
          <div id="ContentContainer">
            <Switch>
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/watched" component={Watched} />
              <Route exact path="/downloads" component={Downloads} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/status" component={Status} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
