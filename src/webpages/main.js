import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Home from "../pages/home";
import Post from "../pages/post";
import About from "../pages/about";
import Menu from "../pages/menu";
import Search from "../pages/search";

class Main extends Component {
  state = {
    str: "",
  };

  handleChange = (str) => {
    this.setState({ str: str });
  };

  handlePage() {
    if (this.state.str === "") {
      return (
        <Switch>
          <Route
            path="/post/:id"
            render={(props) => {
              const {
                match: {
                  params: { id },
                },
              } = props;
              return <Post key={id} {...props} />;
            }}
          />
          <Route
            path="/menu/:tag?"
            render={(props) => {
              const {
                match: {
                  params: { tag },
                },
              } = props;
              return <Menu key={tag} {...props} />;
            }}
          />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      );
    } else {
      return <Search str={this.state.str} />;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header str={this.state.str} handleChange={this.handleChange} />
        <Container>{this.handlePage()}</Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Main;
