import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './App.css';
import Header from './Header'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: ''
    }
  }

  handleBizClick = () => {
    this.setState({ choice: 'Biz' })
  }

  handleConsClick = () => {
    this.setState({ choice: 'Cons' })
  }

  handleLogOut = () => {
    this.setState({ choice: 'Home' })
  }

  render() {
    switch (this.state.choice) {
      case 'Biz': return (<Redirect push to="/business" />)
      case 'Cons': return (<Redirect push to="/consumer" />)
      case 'Home': return (<Redirect push to="/" />)
    }

    return (
      <div>
        <Header isHome={true} goHome={this.handleLogOut}/>
        <div>
          <button className="button" onClick={this.handleBizClick}>Log in as Business</button>
          <button className="button" onClick={this.handleConsClick}>Log in as Consumer</button>
        </div>
      </div>
    )
  }
}

export default Home;