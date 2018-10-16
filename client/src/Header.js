import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Logo from './Logo';
import './App.css';
import NavMenu from './NavMenu';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goHome : false
    }
  }

  logOut = () => {
    this.setState({goHome :true})
  }

  render() {

    if (!this.props.isHome) {
      var logout = <button onClick={this.logOut} className="button logout">Log Out</button>
      //var home = <Redirect push to="/" />
    }

    if (this.state.goHome) {
      var home = <Redirect push to="/" />
    }

    return (
      <div className="App-header">
        <header>
          <Logo 
          logoStyle={this.props.logoStyle}
          />
          <h1 className="App-title">Welcome to YayCat!</h1>
        </header>
        {home}
      </div>
    )
  }
}

export default Header;