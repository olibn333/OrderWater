import React, { Component } from 'react';
import './App.css';

class PointsBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="points" onChange={this.props.updateUser}>
        User: {this.props.user} <br></br><br></br>
        YayPoints: {this.props.counter} <br></br>
        Gold Coins: {this.props.coins}
      </div>
    )
  }
}

export default PointsBox
