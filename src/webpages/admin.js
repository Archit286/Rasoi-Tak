import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPost from "../components/newPost";
import AllPosts from "../components/allPosts";
import Popular from "../components/popular";
import EditPost from "../components/editPost";
import Recommend from "../components/recommend";
import Login from "../components/login";
import axios from "axios";

class Admin extends Component {
  state = {
    error: "",
  };

  setStatus = (status, token) => {
    if (status) {
      sessionStorage.setItem("isUserLogged", token);
      this.setState({ error: "", token: token });
    } else {
      this.setState({ error: "Incorrect Username or Password" });
    }
  };

  handlePage() {
    if (typeof window !== "undefined") {
      var status = sessionStorage.getItem("isUserLogged");
      axios.defaults.headers.common["xauthtoken"] = sessionStorage.getItem(
        "isUserLogged"
      );
      if (status) {
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
