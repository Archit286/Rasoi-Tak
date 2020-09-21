import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import "./App.css";

const Admin = loadable(() => import("./webpages/admin"));
const Main = loadable(() => import("./webpages/main"));

function App() {
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

export default App;
