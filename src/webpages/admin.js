import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPost from "../components/newPost";
import AllPosts from "../components/allPosts";
import Popular from "../components/popular";
import EditPost from "../components/editPost";
import Recommend from "../components/recommend";
import Login from "../components/login";

class Admin extends Component {
  state = {
    error: "",
  };

  setStatus = (status) => {
    sessionStorage.setItem("isUserLogged", status);
    if (status) {
      this.setState({ error: "" });
    } else {
      this.setState({ error: "Incorrect Username or Password" });
    }
  };

  handlePage() {
    if (typeof window !== "undefined") {
      if (JSON.parse(sessionStorage.getItem("isUserLogged"))) {
        return (
          <Switch>
            <Route path="/admin/recommend" component={Recommend} />
            <Route path="/admin/popular" component={Popular} />
            <Route path="/admin/editPost/:id" component={EditPost} />
            <Route path="/admin/popular" component={Popular} />
            <Route path="/admin/newPost" component={NewPost} />
            <Route path="/admin/" component={AllPosts} />
          </Switch>
        );
      } else {
        return <Login error={this.state.error} setStatus={this.setStatus} />;
      }
    }
  }

  render() {
    return <React.Fragment>{this.handlePage()}</React.Fragment>;
  }
}

export default Admin;
