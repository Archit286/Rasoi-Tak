import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./adminHeader";

class newPost extends Component {
  state = {
    ing: [{ value: 0 }],
    method: [{ value: 0 }],
    tags: [{ value: 0 }],
  };

  addIng = () => {
    let ing = this.state.ing;
    let newIng = [...ing, { value: ing.length }];
    this.setState({ ing: newIng });
  };

  addMethod = () => {
    let method = this.state.method;
    let newMethod = [...method, { value: method.length }];
    this.setState({ method: newMethod });
  };

  addTag = () => {
    let tags = this.state.tags;
    let newTags = [...tags, { value: tags.length }];
    this.setState({ tags: newTags });
  };

  deleteIng(id) {
    if (this.state.ing.length === 1) {
      this.setState({ ing: [{ value: 0 }] });
    } else {
      let arr = this.state.ing;
      arr = arr.filter((arr) => {
        return arr.value !== id;
      });
      arr.forEach((arr) => {
        if (arr.value > id) {
          arr.value = arr.value - 1;
        }
      });
      this.setState({ ing: arr });
    }
  }

  deleteMethod(id) {
    if (this.state.method.length === 1) {
      this.setState({ method: [{ value: 0 }] });
    } else {
      let arr = this.state.method;
      arr = arr.filter((arr) => {
        return arr.value !== id;
      });
      arr.forEach((arr) => {
        if (arr.value > id) {
          arr.value = arr.value - 1;
        }
      });
      this.setState({ method: arr });
    }
  }

  deleteTag(id) {
    if (this.state.tags.length === 1) {
      this.setState({ tags: [{ value: 0 }] });
    } else {
      let arr = this.state.tags;
      arr = arr.filter((arr) => {
        return arr.value !== id;
      });
      arr.forEach((arr) => {
        if (arr.value > id) {
          arr.value = arr.value - 1;
        }
      });
      this.setState({ tags: arr });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await axios.post("/api/newPost", data);
    this.props.history.push("/admin");
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.name === "ingredients") {
        this.addIng();
      } else if (e.target.name === "method") {
        this.addMethod();
      } else if (e.target.name === "tags") {
        this.addTag();
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <h1>New Post Form</h1>
          <Row>
            <Form
              id="newForm"
              className="w-100"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
            >
              <Form.Group as={Row} controlId="postTitle">
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="title"
                    onKeyPress={this.handleKeyPress}
                    placeholder="Enter Title of Post"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="postCaption">
                <Form.Label column sm="2">
                  Caption
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="caption"
                    placeholder="Enter Caption"
                    onKeyPress={this.handleKeyPress}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="postIng">
                <Form.Label column sm="2">
                  Ingredients
                </Form.Label>
                <Col sm="10">
                  {this.state.ing.map((ing) => (
                    <Row key={ing.value}>
                      <Col sm="10" style={{ marginBottom: "10px" }}>
                        <Form.Control
                          type="text"
                          name="ingredients"
                          onKeyPress={this.handleKeyPress}
                          placeholder={`Enter Ingredient #${ing.value + 1}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteIng(ing.value)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="primary" type="button" onClick={this.addIng}>
                    Add Ingredient
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="postMethod">
                <Form.Label column sm="2">
                  Method
                </Form.Label>
                <Col sm="10">
                  {this.state.method.map((method) => (
                    <Row key={method.value}>
                      <Col sm="10" style={{ marginBottom: "10px" }}>
                        <Form.Control
                          key={method.value}
                          type="text"
                          name="method"
                          onKeyPress={this.handleKeyPress}
                          placeholder={`Enter Method #${method.value + 1}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteMethod(method.value)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button
                    variant="primary"
                    type="button"
                    onClick={this.addMethod}
                  >
                    Add Method
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="postVideo">
                <Form.Label column sm="2">
                  Video
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="video"
                    onKeyPress={this.handleKeyPress}
                    placeholder="Enter Embedded Link for Video"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="postTags">
                <Form.Label column sm="2">
                  Tags
                </Form.Label>
                <Col sm="10">
                  {this.state.tags.map((tag) => (
                    <Row key={tag.value}>
                      <Col sm="10" style={{ marginBottom: "10px" }}>
                        <Form.Control
                          type="text"
                          name="tags"
                          onKeyPress={this.handleKeyPress}
                          placeholder={`Enter Tag #${tag.value + 1}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteTag(tag.value)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="primary" type="button" onClick={this.addTag}>
                    Add Tag
                  </Button>
                  <Form.Text className="text-muted">
                    Remeber to add menu categories as tags
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.File id="postPhoto" label="Add the Photo" name="photo" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default newPost;
