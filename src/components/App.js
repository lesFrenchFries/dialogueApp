import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
          <h2>Welcome to Dialogue</h2>
          {this.props.children}
      </div>
    )
  }
}

export default App;
