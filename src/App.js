import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./webpages/admin";
import Main from "./webpages/main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    );
  }
}

export default App;
