import React, { Component } from 'react';
import './App.css';

class NavMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  burgerClick = (e) => {
    e.preventDefault();
    this.toggleOpen();
  }

  render() {

    return (
      <span>
        <Burger
          onClick={this.burgerClick}
          isOpen={this.state.isOpen} />
        <CoinPic
          extraClass="counter"
          value={this.props.coinCount}
          key={this.props.coinCount} />
        <nav className={(this.state.isOpen) ? "navMenu open" : "navMenu closed"}>
          <NavBox
            userName={this.props.userName}
            ordersCount={this.props.userOrdersCount}
            bottlesCount={this.props.userBottlesCount}
            coinCount={this.props.coinCount}
            spendCoins={this.props.spendCoins}
          />
        </nav>
      </span>
    )
  }
}

const NavBox = ({ bottlesCount, userName, ordersCount, coinCount, spendCoins }) => {


  const openPrizes = (coinCount) => {
    if (window.confirm("You have " + coinCount + " Coins to Spend! Do you want to spend them?")) { alert("Tough. Spending hasnt been developed yet") }
  }

  const reset = () => {
    window.localStorage.clear()
    if (window.confirm("Do you want to clear your user settings?")) { window.localStorage.clear() }
  }

  return (
    <div className="points">
      <UserBox
        {...{ bottlesCount, ordersCount, coinCount }}
        userName={userName}
        onClick={reset}
      />
      <CoinBox
        coinCount={coinCount}
        spendCoins={spendCoins} />
    </div>
  )
}

const CoinBox = ({ coinCount, spendCoins }) => {
  return (
    <div className="boxContainer coinBox" >
      <div className="boxHeader">Gold Coins: {coinCount}</div>
      <CoinPics
        count={coinCount} />
      <SpendButton
        spendCoins={spendCoins}
        coinsToSpend={1}
      />
      <SpendButton
        spendCoins={spendCoins}
        coinsToSpend={5}
      />
    </div>
  )
}
const SpendButton = ({spendCoins, coinsToSpend}) => {
  const coinInt = Number(coinsToSpend)
  return (
    <button className="spend button" 
    onClick={(e) => {
      e.preventDefault();
      spendCoins(coinInt)}}>
      Spend {coinInt} Coins
      </button>
  )
}

const UserBox = ({ userName, ordersCount, bottlesCount, onClick }) => {
  return (
    <div className="boxContainer" onClick={onClick} >
      <div className="boxHeader">User Details:</div>
      <div className="boxBody">
        <p>Name: {userName}</p>
        <p>Orders Made: {ordersCount}</p>
        <p>Bottles Ordered: {bottlesCount}</p>
      </div>
    </div>
  )
}

const CoinPics = ({ count }) => {

  function amountToCoins(num, arr, maxCap, infinSymbol) {
    let displayCoins = [];
    const isCapped = (num > maxCap)
    let coinsToCount = (isCapped) ? maxCap : num
    for (var i = 0; i < arr.length; i++) {
      while (coinsToCount >= arr[i]) {
        displayCoins.push(arr[i]);
        coinsToCount -= arr[i];
      }
    }
    if (isCapped) { displayCoins.push(infinSymbol) }
    return displayCoins;
  }

  const coinsArray = amountToCoins(count, [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1], 25000, '...')

  return (
    <div className="coinsContainer">
      {coinsArray.map((coinType, i) =>
        <CoinPic
          key={String(coinType) + String(i)}
          value={coinType > 999 ? (Math.floor(coinType / 1000) + 'k') : coinType}
          extraClass='wallet'
        />
      )}
    </div>)
}


const CoinPic = ({ value, extraClass }) => (
  <svg className={`coin ${extraClass} `} viewBox="-3 -3 100 125">
    <g transform="translate(-63.3 -49)">
      <ellipse cx="115" cy="108" rx="43.3" ry="58.5" fill="#540" stroke="black" strokeWidth="3" />
      <ellipse cx="107" cy="108" rx="43.3" ry="58.5" fill="#fc0" stroke="black" strokeWidth="5" />
      <text textAnchor="middle" x="105" y="125" fill="black">{value}</text>
    </g>
  </svg>

)

const Burger = ({ onClick, isOpen }) => (
  <svg className={(isOpen) ? "burger open" : "burger closed"} onClick={onClick} viewBox="0 0 24 24">
    <rect id="topBurger" x="2" y="4" width="20" height="4" />
    <rect id="midBurger" x="2" y="10" width="20" height="4" />
    <rect id="bottomBurger" x="2" y="16" width="20" height="4" />

  </svg>
)



export default NavMenu
