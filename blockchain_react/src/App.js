import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Network} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
