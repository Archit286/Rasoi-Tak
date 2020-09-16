import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const card = (props) => {
  const post = props.post;
  if (post.post_id) {
    post._id = post.post_id;
  }
  return (
    <Card>
      <Card.Img src={post.image} alt={post.title} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Link to={`/post/${post._id}`} className="cardbtn">
          Read More
        </Link>
      </Card.Body>
    </Card>
  );
};

export default card;
