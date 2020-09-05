import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Admin from "./webpages/admin";
import Main from "./webpages/main";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Main} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
