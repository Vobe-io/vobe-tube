import React, { Component } from 'react';
import Sidebar from 'components/Sidebar';
import 'style/master.sass';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Favorites from 'sites/Favorites';
import Video from 'sites/Video';
import Watched from 'sites/Watched';
import Downloads from 'sites/Downloads';
import Settings from 'sites/Settings';
import Profile from 'sites/Profile';
import Status from 'sites/Status'
import Home from 'sites/Home';
import APIService from 'scripts/APIService';
import Upload from 'components/Upload';

export const api = new APIService();

interface State {
  uploading: boolean
}

class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {uploading: false}
  }

  toggleUpload = () =>{
    this.setState({uploading: this.state.uploading ? false : true});
  }

  render() {
    return (
      <div id="App">
        {this.state.uploading && (
          <Upload toggleUpload={this.toggleUpload} />
        )}
        <Router>
          <Sidebar toggleUpload={this.toggleUpload} />
          <div id="ContentContainer">
            <Switch>
              <Route path="/video/:id" component={Video} />
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
