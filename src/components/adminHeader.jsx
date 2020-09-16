import React from "react";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Nav defaultActiveKey="/admin/" as="ul" className="admin-header">
      <Nav.Item as="li">
        <Nav.Link href="/admin/">All Posts</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/admin/newPost" eventKey="link-1">
          Add New Post
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/admin/popular" eventKey="link-2">
          Popular Posts
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/admin/recommend" eventKey="link-2">
          Chef's Recommendation
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
