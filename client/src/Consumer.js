import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Loader from './Loader'
import NavMenu from './NavMenu';

const serverAddress = (process.env.NODE_ENV === "production") ? "https://orderwater-api.herokuapp.com" : ''

class ConsApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userPhoneNumber: "",
      userName: "",
      userAddress: "",
      userOrdersCount: 0,
      userBottlesCount: 0,
      userCoinCount: 0,
      userSpentCoinCount: 0,
      logoStyle: "",
    };
  }

  //DB Connect
  placeOrderDB = (query) => {
    return fetch(serverAddress + `/api/order?q=${query}`, {
      accept: "application/json"
    });
  }

  //Persistence
  componentDidMount = () => {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage()
    );

  }

  componentDidUpdate = () => {
    this.saveStateToLocalStorage()
  }

  componentWillUnmount = () => {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage()
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage = () => {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  hydrateStateWithLocalStorage = () => {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value })
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  //Handlers

  numberOnChange = (e) => {
    this.setState({
      userPhoneNumber: e.target.value
    })
  }

  nameOnChange = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  updateUser = (bottleOrder) => {
    const newCoins = Math.floor((this.state.userBottlesCount + bottleOrder) / 3) - this.state.userCoinCount - this.state.userSpentCoinCount
    console.log(newCoins)

    this.addBottlesCount(bottleOrder);
    this.addOrderCount(1);
    this.placeOrderDB(this.state.userName + ',' + this.state.userPhoneNumber + ',' + bottleOrder)
    this.addCoins(newCoins)
  }

  //Points Handling

  addBottlesCount = (i) => {
    const newBottlesCount = this.state.userBottlesCount + i
    this.setState({
      userBottlesCount: newBottlesCount
    });
  }

  addCoins = (i) => {
    this.setState({
      userCoinCount: this.state.userCoinCount + i,
    });
    console.log(i + ' coins Added')
  }

  addOrderCount = (i) => {
    this.setState({
      userOrdersCount: this.state.userOrdersCount + i,
    });
  }

  spendCoins = (i) => {
    if (this.state.userCoinCount > 0) {
      let logoAnim = ''
      switch (i) {
        case 1 : logoAnim = "munch"; break
        case 5 : logoAnim = "crazy"; break
      }
      this.setState({
        userCoinCount: (this.state.userCoinCount - i),
        userSpentCoinCount: (this.state.userSpentCoinCount + i),
        logoStyle:logoAnim
      })
      console.log('spent ' + i + ' coins to make ' + logoAnim)
    } else {
      console.log('no coins')
    }
  }

  reset = () => {
    this.setState({logoStyle:''})
  }

  //Render

  render() {
    console.log('rendered app')

    return (
      <div className="App">
        <Header
          isHome={false}
          logoStyle={this.state.logoStyle}
          reset={this.reset}/>
        <NavMenu
          userBottlesCount={this.state.userBottlesCount}
          userName={this.state.userName}
          userOrdersCount={this.state.userOrdersCount}
          spendCoins={this.spendCoins}
          coinCount={this.state.userCoinCount}
        />
        <div className="Inputs">
          <UserForm
            updateUser={this.updateUser}
            nameOnChange={this.nameOnChange}
            numberOnChange={this.numberOnChange}
            userName={this.state.userName}
            userPhoneNumber={this.state.userPhoneNumber}
          />
        </div>
      </div>

    );

  }
}


class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiveL: 1,
      oneL: 0,
      isLoading: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateUser(this.state.fiveL)
    this.setState({ isLoading: true })
  }

  reset = () => { this.setState({ isLoading: false }) }

  fiveLOrderOnChange = (event) => {
    const num = Number(event.target.value)
    this.setState({ fiveL: num })
  }

  increaseClick = () => {
    var new1 = this.state.fiveL + 1
    this.setState({ fiveL: new1 })
  }

  decreaseClick = () => {
    var new1 = this.state.fiveL - 1
    this.setState({ fiveL: new1 })
  }

  render() {
    console.log('rendered form')
    var doneSubmit
    if (this.state.isLoading) {
      doneSubmit = <Loader reset={this.reset} />
    } else {
      doneSubmit = <input type="submit" className="button" value="Submit" />
    }

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="label">
          Name:
          <br></br>
          <input
            onChange={this.props.nameOnChange}
            value={this.props.userName}
            className="shrinkable"
            placeholder="Enter Name Here"
          />
        </div>
        <div className="label">
          Phone:
          <br></br>
          <input
            onChange={this.props.numberOnChange}
            value={this.props.userPhoneNumber}
            className="shrinkable"
            placeholder="Enter Phone Number Here"
          />
        </div>

        <div className="label">
          How many 5L bottles? <br></br>

          <button
            type="button"
            onClick={this.decreaseClick}
            className="button side"
          >-</button>

          <input
            onChange={this.fiveLOrderOnChange}
            type="number"
            value={this.state.fiveL}
            className="shrinkable"
          />

          <button
            type="button"
            onClick={this.increaseClick}
            className="button side"
          >+</button>

        </div>
        {doneSubmit}

      </form>

    )
  }
}

export default ConsApp;