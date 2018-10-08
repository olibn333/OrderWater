import React, { Component } from 'react';
import './App.css';

const UserBox = ({ bottlesCount, userName, ordersCount }) => {

  const coinCount = Math.floor(bottlesCount / 3)

  const openPrizes = (coinCount) => {
    if (window.confirm("You have " + coinCount + " Coins to Spend! Do you want to spend them?")) { alert("Tough. Spending hasnt been developed yet") }
  }

  const reset = () => {
    window.localStorage.clear()
    if (window.confirm("Do you want to clear your user settings?")) {window.localStorage.clear()}
  }

  return (
    <div className="points">
      <UserDataList
        {...{ bottlesCount, ordersCount, coinCount }}
        header={userName}
        onClick={reset} />
      <CoinPics
        count={coinCount}
        onClick={openPrizes} />
      <SpendButton
        openSpender={() => openPrizes(coinCount)} />
    </div>
  )
}

const SpendButton = ({ openSpender }) => {
  return (
    <button className="spend button" onClick={openSpender}>Spend Coins?</button>
  )
}

const UserDataList = ({ header, ordersCount, bottlesCount, coinCount, onClick }) => {
  return (
    <div className="boxContainer" onClick={onClick}>
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

  function amountToCoins(num, arr, maxCap, infinSymbol) {
    let displayCoins = [];
    const isCapped = (num>maxCap)
    let coinsToCount = (isCapped) ? maxCap : num
    for (var i = 0; i < arr.length; i++) {
      while (coinsToCount >= arr[i]) {
        displayCoins.push(arr[i]);
        coinsToCount -= arr[i];
      }
    }
    if (isCapped) {displayCoins.push(infinSymbol)}
    return displayCoins;
  }

  const coinsArray = amountToCoins(count, [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1], 25000, '...')

  return (
    <div
      className="coinsContainer"
      onClick={() => onClick(count)}>
      {coinsArray.map((coinType, i) =>
        <CoinPic
          key={String(coinType) + String(i)}
          value={coinType > 999 ? (Math.floor(coinType / 1000) + 'k') : coinType}
        />
      )}
    </div>)
}


const CoinPic = ({ value }) => (
  <svg className="coin" viewBox="-3 -3 100 125">
    <g transform="translate(-63.3 -49)">
      <ellipse cx="115" cy="108" rx="43.3" ry="58.5" fill="#540" stroke="black" strokeWidth="3" />
      <ellipse cx="107" cy="108" rx="43.3" ry="58.5" fill="#fc0" stroke="black" strokeWidth="5" />
      <text textAnchor="middle" x="105" y="125" fill="black">{value}</text>
    </g>
  </svg>

)



export default UserBox
