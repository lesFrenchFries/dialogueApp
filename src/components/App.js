import React, { Component } from 'react';
import './App.css';
import Menu from './modals/Menu';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  closeMenu = () => {
    this.setState({ isMenuOpen: false })
  }

  render() {
    console.log(this.state)
    let {isMenuOpen} = this.state;
    let {auth} = this.props.route
    return (
      <div>
        <div className="App-navbar">
          <h2>Welcome to Dialogue</h2>
          <i className="fa fa-caret-down"
            onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}
          />
        </div>
        <Menu show={isMenuOpen} auth={auth} closeMenu={this.closeMenu}/>
        {this.props.children}
      </div>
    )
  }
}

export default App;
