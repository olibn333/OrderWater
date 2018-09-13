import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbData: [],
      isLoading: true,
      myOrders: []
    };
  }

  //DB Connect

  componentDidMount() {
    var q = 'auth123'
    fetch('/api/call?q=' + q)
      .then(response => {
        if (response.ok) {
          //var res1 = response.json()
          //console.log(res1)
          return response.json()
        } else {
          console.log('Bad response from server - ' + response.statusText)
          return []
        }
      })
      .then(response2 => {
        this.setState({ dbData: response2[0], isLoading: false })
      })
  }

  saveOrders = (orderId) => {
    var newState = this.state.myOrders.concat(orderId)
    this.setState({ myOrders: newState })
  }



  render() {
    //console.log(this.state.data.map(x => x));
    //this.state.data.forEach(x => console.log(x))
    console.log('App Rendered')
    console.log('DL Data ' + this.state.dbData.length)

    var form
    if (this.state.isLoading) {
      form = <p>Loading...</p>
    } else {
      form =
        <TableForm
          save={this.saveOrders}
          data={this.state.dbData}
        //removeRows={this.removeRows}
        //handleSubmit={this.handleSubmit}
        />
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <CounterMark
            myOrders={this.state.myOrders}
          />
          <h1 className="App-title">Welcome to YaYCat Orders!</h1>
        </header>
        <p className="App-intro">
          To get started, select some Orders below!
    </p>
        {form}
      </div>
    )
  }
}

class TableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      renderRows: []
    };
  }

  componentDidMount() {
    this.setState({ renderRows: this.props.data })
  }

  removeRows = (remRows) => {
    console.log(remRows)
    this.setState((prevState) => ({
      renderRows: prevState.renderRows.filter((row) => remRows.includes(row.id) ? '' : row)
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.save(this.state.commits)
    this.removeRows(this.state.commits)
  }

  addCommit = (rowid) => {
    //var newState = this.state.commits.concat(rowid)
    this.setState((prevState) => ({ commits: prevState.commits.concat(rowid) }))
  }

  render() {
    console.log('Table Rendered')

    var headData = this.props.data[0]
    var heads

    if (headData === undefined) {
      heads = <tbody><tr><td>'Loading...'</td></tr></tbody>
    }
    else {
      heads =
        <thead>
          <tr>
            <th></th>
            {Object.keys(headData).map((x, i) => <th key={i}>{x}</th>)}
          </tr>
        </thead>
    }

    return (

      <form onSubmit={this.handleSubmit}>
        <button className='button'>Commit to These Orders</button>
        <table>
          {heads}
          <tbody>
            {this.state.renderRows.map((x) =>
              <TableRow
                key={Object.values(x)[0]}
                cells={x}
                save={this.addCommit}
              />
            )}
          </tbody>
        </table>
      </form>
    )
  }
}


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  handleChange = () => {
    this.setState({ selected: !this.state.selected })
    this.props.save(Object.values(this.props.cells)[0])
  }

  render() {
    console.log('Row Rendered')
    return (
      <tr onClick={this.handleChange} className={this.state.selected ? 'selected' : 'unselected'}>
        <td key='0'><input onClick={this.handleChange} type='checkbox' checked={this.state.selected}></input></td>
        {Object.values(this.props.cells).map((y, i) =>
          <td key={i + 1}>
            {y}
          </td>
        )}
      </tr>)
  }
}

class CounterMark extends Component {

  render() {
    console.log('Counter Rendered')
    return (
      <div className="points" onChange={this.props.updateUser}>
        User: {this.props.user} <br></br><br></br>
        YayPoints: {this.props.counter} <br></br>
        Gold Coins: {this.props.coins}
        My Orders: {this.props.myOrders.length}
      </div>
    )
  }
}

export default App;
