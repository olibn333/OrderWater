import React, { Component } from 'react';
import {
  Route,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import BizApp from './Business'
import ConsApp from './Consumer'
import Home from './Home'



class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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