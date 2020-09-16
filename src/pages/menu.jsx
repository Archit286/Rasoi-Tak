import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Card from ".././components/card";

class menu extends Component {
  state = { data: [{}], str: "Showing All Posts " };

  async componentDidMount() {
    let result = [];
    const tag = this.props.match.params.tag;
    if (tag) {
      result = await axios.get(`/api/site/tags/${tag}`);
    } else {
      result = await axios.get("/api/site/allpost");
    }

    this.setState({
      data: result.data,
      str: tag ? this.state.str.concat("Labelled '", tag, "'") : this.state.str,
    });
  }

  handleData(data) {
    if (typeof data === "string") {
      return <h4>No Posts Found</h4>;
    } else {
      return this.state.data.map((item) => (
        <Col
          lg={3}
          md={4}
          xs={6}
          key={item._id ? item._id : "0"}
          className="menu-column"
        >
          <Card post={item} />
        </Col>
      ));
    }
  }

  render() {
    return (
      <React.Fragment>
        <h5 className="result">{this.state.str}:</h5>
        <Row>{this.handleData(this.state.data)}</Row>
      </React.Fragment>
    );
  }
}

export default menu;
