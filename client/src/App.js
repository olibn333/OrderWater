import React, { Component } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import BizApp from './Business'
import ConsApp from './Consumer'
import Home from './Home'
import Header from './Header'



class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path exact="/" component={Home} />
            <Route path="/business" component={BizApp} />
            <Route path="/consumer" component={ConsApp} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default App