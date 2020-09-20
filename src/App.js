import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {
    main: "",
    admin: "",
  };

  async componentDidMount() {
    const { default: Main } = await import("./webpages/main");
    const { default: Admin } = await import("./webpages/admin");
    this.setState({
      main: <Main />,
      admin: <Admin />,
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/admin">{this.state.admin}</Route>
        <Route path="/">{this.state.main}</Route>
      </Switch>
    );
  }
}

export default App;
