import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./webpages/admin";
import Main from "./webpages/main";
import "./App.css";

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
