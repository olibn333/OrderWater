import React, { Component } from 'react';
import './App.css';

const UserBox = ({ bottlesCount, userName, ordersCount }) => {

  const coinCount = Math.floor(bottlesCount / 3)

  const openPrizes = (coinCount) => {
    if (window.confirm("You have " + coinCount + " Coins to Spend! Do you want to spend them?")) { alert("Tough. Spending hasnt been developed yet") }
  }

  return (
    <div className="points">
      <UserDataList
        {...{ bottlesCount, ordersCount, coinCount }}
        header={userName} />
      <CoinPics
        count={coinCount}
        onClick={openPrizes} />
      <SpendButton
        openSpender={()=>openPrizes(coinCount)} />
    </div>
  )
}

const SpendButton = ({ openSpender }) => {
  return (
  <button className="spend button" onClick={openSpender}>Spend Coins?</button>
  )
}

const UserDataList = ({ header, ordersCount, bottlesCount, coinCount }) => {
  return (
    <div className="boxContainer">
      <div className="boxHeader">{header}</div>
      <div className="boxBody">
        <p>Orders Made: {ordersCount}</p>
        <p>Bottles Ordered: {bottlesCount}</p>
        <p>Gold Coins: {coinCount}</p>
      </div>
    </div>
  )
}

const CoinPics = ({ onClick, count }) => {

  function amountToCoins(num, arr) {
    var coins = [];
    for (var i = 0; i < arr.length; i++) {
      while (num >= arr[i]) {
        coins.push(arr[i]);
        num = num - arr[i];
      }
    }
    return coins;
  }

  const coinsArray = amountToCoins(count, [10, 5, 1])

  return (
    <div
      className="coinsContainer"
      onClick={() => onClick(count)}>
      {coinsArray.map((coinType, i) => <CoinPic key={i} value={coinType} />)}
    </div>)
}


const CoinPic = ({ value }) => (
  <svg className="coin" viewBox="-3 -3 100 125">
    <g transform="translate(-63.3 -49)">
      <ellipse cx="115" cy="108" rx="43.3" ry="58.5" fill="#540" stroke="black" strokeWidth="3" />
      <ellipse cx="107" cy="108" rx="43.3" ry="58.5" fill="#fc0" stroke="black" strokeWidth="5" />
      <text text-anchor="middle" x="105" y="130" fill="black">{value}</text>
    </g>
  </svg>

)



export default UserBox
