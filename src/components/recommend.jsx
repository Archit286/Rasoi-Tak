import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Header from "./adminHeader";

class Recommend extends Component {
  state = {
    recommend: [
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
      {
        _id: "",
        post_id: "",
        title: "",
        photo: "",
        button: true,
      },
    ],
  };

  async handleChange(e, id) {
    let recommend = this.state.recommend;
    let title = e.target.value;
    const result = await this.handleButton(title);
    recommend.forEach((post) => {
      if (post._id === id) {
        post.title = title;
        post.button = result.status;
        if (!result.status) {
          post.photo = result.photo;
          post.post_id = result.post_id;
          post.alert = "";
        } else {
          post.alert = <Alert variant="danger">No Such Post Found</Alert>;
        }
      }
    });
    this.setState({ recommend: recommend });
  }

  async handleButton(title) {
    const result = await axios.get(`/api/recommend/title/${title}`);
    if (result.data.length === 1) {
      return {
        status: false,
        photo: result.data[0].image,
        post_id: result.data[0]._id,
      };
    } else {
      return { status: true };
    }
  }

  handleSubmit(e, id) {
    const arr = this.state.recommend.filter((arr) => {
      return arr._id === id;
    })[0];
    axios.put("/api/recommend", arr);
  }

  async componentDidMount() {
    const { data } = await axios.get("/api/recommend");
    let count = 0;
    let recommend = this.state.recommend;
    recommend.forEach((pop) => {
      var post = data[count];
      count = count + 1;
      pop._id = post._id;
      pop.title = post.title;
      pop.photo = post.image;
      pop.post_id = post.post_id;
    });
    this.setState({ recommend: recommend });
  }

  render() {
    let recommend = this.state.recommend;
    let count = 0;
    return (
      <React.Fragment>
        <Header />
        <Container>
          <h1>Recommended Posts</h1>
          {recommend.map((post) => (
            <Form
              className="w-100"
              key={count}
              onSubmit={(e) => this.handleSubmit(e, post._id)}
            >
              <Form.Group as={Row} controlId="postTitle">
                <Form.Label column sm="1">
                  Post #{(count = count + 1)}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="recommend"
                    value={post.title}
                    placeholder={`Enter post #${count}`}
                    onChange={(e) => this.handleChange(e, post._id)}
                  />
                  {post.alert}
                </Col>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={post.button}
                  style={{ height: "40px" }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}

export default Recommend;
