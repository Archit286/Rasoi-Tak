import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class login extends Component {
  state = {
    email: "",
    password: "",
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!(this.state.email && this.state.password)) {
      this.props.setStatus(false);
    } else {
      const result = await axios.post("/api/login/", this.state);
      this.props.setStatus(result.data.status, result.headers.xauthtoken);
    }
  };

  render() {
    return (
      <Container style={{ height: "100vh" }}>
        <Row
          className="justify-content-md-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Col md="4">
            <h1>Login:</h1>
            <Form id="newForm" className="w-100" onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter your Email address"
                  autoComplete="username"
                  onChange={this.handleEmailChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter your Password"
                  autoComplete="current-password"
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>
              {this.props.error ? (
                <div className="alert alert-danger">{this.props.error}</div>
              ) : null}
              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default login;
