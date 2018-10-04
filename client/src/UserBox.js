import React, { Component } from 'react';
import './App.css';

class UserBox extends Component {
  constructor(props) {
    super(props);
  }

  openPrizes = (coins) => {
    if(window.confirm("You have " + coins + " Coins to Spend! Do you want to spend them?")) {alert("Tough. Spending hasnt been developed yet")}
  }

  render() {
    const coins = Math.floor(this.props.bottlesCount / 3)
    return (
      <div className="points" onChange={this.props.updateUser}>
        <div className="boxHeader">{this.props.user}</div>
        <div className="boxBody">
          <p>Orders Made: {this.props.ordersCount}</p>
          <p>Bottles Ordered: {this.props.bottlesCount}</p>
          <p>Gold Coins: {coins}</p>
        </div>
        <CoinPics 
          count={coins}
          onClick={this.openPrizes} />
      </div>
    )
  }
}

const CoinPics = (props) => {
  let clickCoins = () => {
    props.onClick(props.count)
  }
  let renderCoins = []
  for (let i = 0; i < props.count; i++) {
    renderCoins.push(<CoinPic />)
  }
  return (
    <div 
      className="coinsContainer" 
      onClick={clickCoins}>
        {renderCoins}
    </div>)
}


const CoinPic = () => (
  <svg className="coin" viewBox="-3 -3 100 125">
    <g transform="translate(-63.3 -49)">
      <ellipse cx="115" cy="108" rx="43.3" ry="58.5" fill="#540" stroke="black" stroke-width="3" />
      <ellipse cx="107" cy="108" rx="43.3" ry="58.5" fill="#fc0" stroke="black" stroke-width="5" />
      <text x="95" y="130" fill="black">1</text>
    </g>
  </svg>

)

export default UserBox
