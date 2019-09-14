import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Network from "./components/Network";
import Default from "./components/Default";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Network} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
