import React, { Component } from 'react';
import './App.css';

class UserBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="points" onChange={this.props.updateUser}>
        <div className="header">{this.props.user}</div>
        <p>Orders Made: {this.props.ordersCount}</p>
        <p>Orders Completed: {this.props.ordersDoneCount}</p>
        <p>Total Bottles: {this.props.fiveLCount}</p>
        <p>Gold Coins: {this.props.coins}</p>
      </div>
    )
  }
}

export default UserBox
