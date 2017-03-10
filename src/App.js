import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import World from './World';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Rogue-like Game with Procedural Generated Maps</h2>
        </div>
        <div className="App-intro">
          <World />
        </div>
      </div>
    );
  }
}

export default App;
