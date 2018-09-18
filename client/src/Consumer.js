import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import PointsBox from './PointsBox'

class ConsApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      yayPoints: 0,
      goldCoins: 0,
      spentPoints: 0,
      spentCoins: 0,
      pointToCoin: 0,
      pointToCoinLevel: 10,
      userPhoneNumber: "",
      userName: "",
      userAddress: "",
    };
  }

  //DB Connect
  query1 = (query) => {
    return fetch(`/api/order?q=${query}`, {
      accept: "application/json"
    });
  }

  //Persistence

  componentDidMount = () => {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page

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

  updateUser = (order) => {
    this.addPoints(3);
    this.calcCoins();
    this.query1(this.state.userName + ',' + this.state.userPhoneNumber + ',' + order);
  }

  //Points Handling

  addPoints = (i) => {
    this.setState({
      yayPoints: this.state.yayPoints + i,
      pointToCoin: this.state.pointToCoin + i
    });
  }

  addCoins = (i) => {
    this.setState({
      goldCoins: this.state.goldCoins + i,
    });
  }


  calcCoins = () => {
    this.setState((prevState) => {
      const newCoins = Math.floor(prevState.pointToCoin / prevState.pointToCoinLevel)
      return {
        goldCoins: prevState.goldCoins + newCoins,
        pointToCoin: prevState.pointToCoin % prevState.pointToCoinLevel
      };
    });

  }

  saveStateToLocalStorage = () => {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }


  //Render

  render() {
    console.log('rendered app')

    return (
      <div className="App">
          <Header isHome={false}/>
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
      oneL: 0
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateUser(this.state.fiveL)
  };

  fiveLOrderOnChange = (event) => {
    this.setState({ fiveL: event.target.value })
  }

  increaseClick = () => {
    var new1 = this.state.fiveL + 1
    this.setState({ fiveL : new1 })
  }

  decreaseClick = () => {
    var new1 = this.state.fiveL - 1
    this.setState({ fiveL : new1 })
  }

  render() {
    console.log('rendered form')
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="label">
          Name:
          <br></br>
          <input
            onChange={this.props.nameOnChange}
            value={this.props.userName}
            placeholder="Enter Name Here"
          />
        </div>
        <div className="label">
          Phone:
          <br></br>
          <input
            onChange={this.props.numberOnChange}
            value={this.props.userPhoneNumber}
            placeholder="Enter Phone Number Here"
          />
        </div>
        
        <div className="label">
          How many 5L bottles? <br></br>

          <button
            onClick={this.decreaseClick}
            className="button side"
          >-</button>

          <input
            onChange={this.fiveLOrderOnChange}
            type="number"
            value={this.state.fiveL}
            className="num"
          />

          <button
            onClick={this.increaseClick}
            className="button side"
          >+</button>

        </div>

        <input type="submit" className="button" value="Submit" />
      </form>

    )
  }
}

export default ConsApp;