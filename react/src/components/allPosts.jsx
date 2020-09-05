import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Header from "./adminHeader";

class AllPosts extends Component {
  state = {
    posts: [],
    link: "/admin/editPost/",
    str: "",
    count: 0,
  };

  async handleDelete(title) {
    console.log("Post Deleted Successfully");
    this.setState({
      posts: this.state.posts.filter(function (post) {
        return post.title !== title;
      }),
    });
    await axios.delete(`/api/allPosts/${title}`);
  }

  handleChange = async (event) => {
    const str = event.target.value;
    const { data: result } = await axios.get(`/api/allPosts/${str}`);
    this.setState({ posts: result, str: str, count: result.length });
  };

  async componentDidMount() {
    const result = await axios.get("/api/allPosts");
    this.setState({ posts: result.data, count: result.data.length });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container fluid>
          <Form
            onSubmit={(e) => e.preventDefault()}
            style={{ float: "right", width: "25%" }}
          >
            <Form.Group as={Row}>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search..."
                style={{ width: "90%" }}
                value={this.state.str}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
          <p>Showing {this.state.count} posts: </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>
                    <a href={this.state.link + post._id}>
                      <Button variant="secondary">Edit</Button>
                    </a>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => this.handleDelete(post.title)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

export default AllPosts;
