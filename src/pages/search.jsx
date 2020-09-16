import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Card from ".././components/card";
import axios from "axios";

class search extends Component {
  state = {
    data: [],
    str: "",
  };

  async componentDidUpdate() {
    const { data } = await axios.get(`/api/site/search/${this.props.str}`);
    this.setState({
      data: data.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i),
      str: this.props.str,
    });
  }

  async componentDidMount() {
    const { data } = await axios.get(`/api/site/search/${this.props.str}`);
    this.setState({
      data: data.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i),
      str: this.props.str,
    });
  }

  render() {
    return (
      <React.Fragment>
        <h5 className="result">
          Showing Posts labelled for '{this.state.str}':
        </h5>
        <Row>
          {this.state.data.map((item) => (
            <Col lg={3} key={item._id}>
              <Card post={item} />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default search;
