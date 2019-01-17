import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import HeaderKu from './components/HeaderKu';
import HomeKu from './components/HomeKu';
import LoginKu from './components/LoginKu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderKu />
        <div className="container myBody">
          <Route exact path="/" component={HomeKu} />
          <Route path="/login" component={LoginKu} />
        </div>

      </div>
    );
  }
}

export default App;
