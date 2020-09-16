import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./adminHeader";

class editPost extends Component {
  state = {
    id: "",
    title: "",
    caption: "",
    ing: [{ id: 0, value: "" }],
    method: [{ id: 0, value: "" }],
    video: "",
    tags: [{ id: 0, value: "" }],
    photo: "",
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "/api/editPost/" + this.props.match.params.id
    );
    let ing = [],
      method = [],
      tags = [],
      count = 0;
    if (typeof data.ingredients === "object") {
      data.ingredients.forEach((element) => {
        ing.push({ id: count, value: element });
        count = count + 1;
      });
      count = 0;
    } else {
      ing = [{ id: 0, value: data.ingredients }];
    }
    if (typeof data.method === "object") {
      data.method.forEach((element) => {
        method.push({ id: count, value: element });
        count = count + 1;
      });
      count = 0;
    } else {
      method = [{ id: 0, value: data.method }];
    }
    if (typeof data.tags === "object") {
      data.tags.forEach((element) => {
        tags.push({ id: count, value: element });
        count = count + 1;
      });
    } else {
      tags = [{ id: 0, value: data.tags }];
    }
    this.setState({
      id: data._id,
      title: data.title,
      caption: data.caption,
      video: data.video,
      photo: data.image,
      ing: ing,
      method: method,
      tags: tags,
    });
  }

  addIng = () => {
    let ing = this.state.ing;
    let newIng = [...ing, { id: ing.length, value: "" }];
    this.setState({ ing: newIng });
  };

  addMethod = () => {
    let method = this.state.method;
    let newMethod = [...method, { id: method.length, value: "" }];
    this.setState({ method: newMethod });
  };

  addTag = () => {
    let tags = this.state.tags;
    let newTags = [...tags, { id: tags.length, value: "" }];
    this.setState({ tags: newTags });
  };

  deleteIng(id) {
    if (this.state.ing.length === 1) {
      this.setState({ ing: [{ id: 0, value: "" }] });
    } else {
      let arr = this.state.ing;
      arr = arr.filter((arr) => {
        return arr.id !== id;
      });
      arr.forEach((arr) => {
        if (arr.id > id) {
          arr.id = arr.id - 1;
        }
      });
      this.setState({ ing: arr });
    }
  }

  deleteMethod(id) {
    if (this.state.method.length === 1) {
      this.setState({ method: [{ id: 0, value: "" }] });
    } else {
      let arr = this.state.method;
      arr = arr.filter((arr) => {
        return arr.id !== id;
      });
      arr.forEach((arr) => {
        if (arr.id > id) {
          arr.id = arr.id - 1;
        }
      });
      this.setState({ method: arr });
    }
  }

  deleteTag(id) {
    if (this.state.tags.length === 1) {
      this.setState({ tags: [{ id: 0, value: "" }] });
    } else {
      let arr = this.state.tags;
      arr = arr.filter((arr) => {
        return arr.id !== id;
      });
      arr.forEach((arr) => {
        if (arr.id > id) {
          arr.id = arr.id - 1;
        }
      });
      this.setState({ tags: arr });
    }
  }

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

  handleSubmit = async (e) => {
    const data = new FormData(e.target);
    await axios.put("/api/editPost/" + this.state.id, data);
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <h1>Edit Post Form</h1>
          <Row>
            <Form id="newForm" className="w-100" onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="postTitle">
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="title"
                    onKeyPress={this.handleKeyPress}
                    defaultValue={this.state.title}
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
                    defaultValue={this.state.caption}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Enter Caption"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="postIng">
                <Form.Label column sm="2">
                  Ingredients
                </Form.Label>
                <Col sm="10">
                  {this.state.ing.map((ing) => (
                    <Row key={ing.id}>
                      <Col sm="10" style={{ marginBottom: "10px" }}>
                        <Form.Control
                          type="text"
                          name="ingredients"
                          defaultValue={ing.value}
                          onKeyPress={this.handleKeyPress}
                          placeholder={`Enter Ingredient #${ing.id + 1}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteIng(ing.id)}
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
                    <Row key={method.id}>
                      <Col sm="10" style={{ marginBottom: "10px" }}>
                        <Form.Control
                          type="text"
                          name="method"
                          onKeyPress={this.handleKeyPress}
                          defaultValue={method.value}
                          placeholder={`Enter Method #${method.id + 1}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteMethod(method.id)}
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
                    defaultValue={this.state.video}
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
                    <Row key={tag.id}>
                      <Col sm="10" style={{ marginBottom: "10px" }}>
                        <Form.Control
                          type="text"
                          name="tags"
                          onKeyPress={this.handleKeyPress}
                          defaultValue={tag.value}
                          placeholder={`Enter Tag #${tag.id + 1}`}
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteTag(tag.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="primary" type="button" onClick={this.addTag}>
                    Add Tag
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.File
                  id="postPhoto"
                  label="Change the Photo"
                  name="photo"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <img
              src={this.state.photo}
              alt="No pic Uploaded"
              height="275px"
              width="400px"
            />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default editPost;
