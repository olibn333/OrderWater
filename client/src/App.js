import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

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

  updateUser = () => {
    this.addPoints(3);
    this.calcCoins();
    this.query1(this.state.userName+','+this.state.userPhoneNumber);
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
    // for every item in React state
    for (let key in this.state) {
      //console.log("saved " + key)
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }


  //Render

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <CounterMark
            updateUser={this.updateUser}
            user={this.state.userName}
            counter={this.state.yayPoints}
            coins={this.state.goldCoins}
          />
          <h1 className="App-title">Welcome to YayCat!</h1>
        </header>
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


class CounterMark extends Component {
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

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('Hello');
    this.props.updateUser(event);
  };


  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            onChange={this.props.nameOnChange}
            value={this.props.userName}
            placeholder="Enter Name Here"
          />
        </label>
        <br></br>
        <label>
          Phone:
          <input
            onChange={this.props.numberOnChange}
            value={this.props.userPhoneNumber}
            placeholder="Enter Phone Number Here"
          />
        </label>
        <br></br>
        <input type="submit" className="button" value="Submit" />
      </form>

    )
  }
}

export default App;
