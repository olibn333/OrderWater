import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import * as Fingerprint2 from 'fingerprintjs2';
import Loader from './Loader'


class BizApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbData: [],
      isLoading: true,
      userHash: [''],
      myOrders: [],
      err: ''
    };
  }

  componentDidMount() {
    this.dbGetOrders(); //sqlite db connection
    //this.dbGetTestOrders(); // TODO - localstorage connection for testing
    this.checkUser(); 
  }

  //DB Connect

  dbGetOrders = () => {
    const q = 'auth123'
    fetch('/api/call?q=' + q)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.status + " " + response.statusText)
        }
      })
      .then(response2 => {
        console.log(response2)
        if (response2[0].length > 0) {
          this.setState({ dbData: response2[0], isLoading: false })
        } else {
          throw new Error("No More Orders!")
        }
      })
      .catch(error => {
        this.setState({ err: error })
        console.log(error)
      })
  }

  dbCommitOrders = (query) => {
    fetch(`/api/commit?q=${query}`, {
      accept: "application/json"
    });
  }

  //User
  checkUser = () => {
    new Fingerprint2().get((result, components) => {
      console.log(result) // a hash, representing your device fingerprint
      //console.log(components) // an array of FP components
      this.setState({ userHash: [result] })
    })
  }

  saveOrders = (orderIds) => {
    const newState = this.state.myOrders.concat(orderIds)
    this.setState({ myOrders: newState }, () => {
      const uHashAndData = this.state.userHash.concat(orderIds)
      console.log(uHashAndData)
      this.dbCommitOrders(uHashAndData)
    }
    )
  }

  render() {
    console.log('App Rendered')

    let form
    if (this.state.isLoading) {
      const err = this.state.err
      form =
        <div>
          <p>Loading...</p>
          <p className="error">{err.message}</p>
        </div>
    } else {

      form =
        <TableForm
          save={this.saveOrders}
          data={this.state.dbData}
        />
    }

    return (
      <div className="App">
        <Header />

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
      committedRows: [],
      renderRows: [],
      isLoading: false,
      selectedAll: false
    };
  }

  componentDidMount() {
    this.setState({ renderRows: this.props.data })
  }

  //Submission
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.save(this.state.committedRows)
    this.removeRows(this.state.committedRows)
    this.setState({ isLoading: true })
    if (this.state.selectedAll === true) { this.setState({ selectedAll: false }) }
  }

  removeRows = (remRows) => {
    this.setState((prevState) => ({
      renderRows: prevState.renderRows.filter((row) => remRows.includes(row.id) ? '' : row)
    }))
  }

  resetLoading = () => { this.setState({ isLoading: false }) }

  //Select One
  selectCommit = (rowid) => {
    if (this.state.committedRows.includes(rowid)) { this.removeCommit(rowid) } else { this.addCommit(rowid) }
  }

  addCommit = (rowid) => {
    const newState = this.state.committedRows.concat(rowid)
    this.setState({
      committedRows: newState
    })
  }

  removeCommit = (rowid) => {
    const newState = this.state.committedRows.filter(id => !(id === rowid))
    this.setState({
      committedRows: newState
    })
  }

  //Select All
  selectAllClick = () => {
    if (this.state.selectedAll === true) {
      this.deselectAll()
    } else {
      this.selectAll()
    }
    this.setState({ selectedAll: !this.state.selectedAll })
  }

  selectAll = () => {
    const idArray = this.state.renderRows.map((x) => x.id)
    console.log(idArray)
    this.setState({
      committedRows: idArray
    })
  }

  deselectAll = () => {
    this.setState({
      committedRows: []
    })

  }

  render() {
    console.log('Table Rendered')

    let headData = this.props.data[0]
    let heads

    if (headData === undefined) {
      heads = <tbody><tr><td>'Loading...'</td></tr></tbody>
    }
    else {
      heads =
        <thead>
          <tr>
            <th><input onClick={this.selectAllClick} type='checkbox'></input></th>
            {Object.keys(headData).map((x) => <th key={x.name}>{x}</th>)}
          </tr>
        </thead>
      console.log("head rendered")
    }

    let submitButton
    if (this.state.isLoading) {
      submitButton = <Loader reset={this.resetLoading} />
    } else {
      submitButton = <button className='button'>Commit to These Orders</button>
    }

    return (

      <form onSubmit={this.handleSubmit}>
        <table>
          {heads}
          <tbody>
            {this.state.renderRows.map((x) =>
              <TableRow
                key={Object.values(x)[0].toString()}
                cells={x}
                save={this.selectCommit}
                selected={this.state.committedRows.includes(Object.values(x)[0]) ? true : false}
              />
            )}
          </tbody>
        </table>
        {submitButton}
      </form>
    )
  }
}


class TableRow extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = () => this.props.save(Object.values(this.props.cells)[0]);

  render() {
    console.log('Row Rendered')
    return (
      <tr onClick={this.handleChange} className={this.props.selected ? 'selected' : 'unselected'}>
        <td><input onClick={this.handleChange} type='checkbox' checked={this.props.selected}></input></td>
        {Object.values(this.props.cells).map((y) =>
          <td key={"cell" + y}>
            {y}
          </td>
        )}
      </tr>)
  }
}


export default BizApp;
