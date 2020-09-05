import React, { Component } from "react";
import axios from "axios";
import Slideshow from ".././components/slideshow";
import Slider from ".././components/slider";

class Home extends Component {
  state = {
    latest: [],
    popular: [],
    recommend: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("/api/site");
    this.setState({
      latest: data.latest,
      recommend: data.recommend,
      popular: data.popular,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Slideshow />
        <Slider title="Chef's Recommendation" data={this.state.recommend} />
        <Slider title="Most Visited Posts" data={this.state.popular} />
        <Slider title="Latest Posts" data={this.state.latest} />
      </React.Fragment>
    );
  }
}

export default Home;
