import React, { Component } from 'react';
import { Redirect } from 'react-router';
import logo from './icons/logo.svg';
import './App.css';

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
      <div>
        <header className="App-header">
        {logout}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to YayCat!</h1>
        </header>
        {home}
      </div>
    )
  }
}

export default Header;