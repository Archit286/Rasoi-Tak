import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faPinterestP,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Row, Col } from "react-bootstrap";
import Slider from ".././components/slider";

class post extends Component {
  state = {
    title: "",
    caption: "",
    image: "",
    video: "",
    ing: [],
    method: [],
    tags: [],
    related: [],
  };

  handleArr(arr) {
    if (typeof arr === "string") {
      return [arr];
    } else {
      return arr;
    }
  }

  handleRelated(arr, id) {
    arr = arr.filter((element) => {
      return element._id !== id;
    });
    var min_arr_length;
    const width = window.innerWidth;

    if (width < 425) {
      min_arr_length = 1;
    } else if (width < 768) {
      min_arr_length = 2;
    } else if (width < 992) {
      min_arr_length = 3;
    } else {
      min_arr_length = 4;
    }

    if (arr.length < min_arr_length) {
      for (let i = arr.length; i < min_arr_length; i++) {
        arr.push({ _id: i });
      }
    }
    return arr;
  }

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/site/post/${this.props.match.params.id}`
    );
    const result = await axios.get(`/api/site/tags/${data[0].tags}`);

    const related = this.handleRelated(result.data, data[0]._id);

    this.setState({
      title: data[0].title,
      caption: data[0].caption,
      video: data[0].video,
      image: data[0].image,
      ing: this.handleArr(data[0].ingredients),
      method: this.handleArr(data[0].method),
      tags: data[0].tags,
      related: related,
    });
  }

  render() {
    return (
      <div className="post">
        <h2>{this.state.title}</h2>
        <p>{this.state.caption}</p>
        <div className="share">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="share-btn"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href={`http://twitter.com/share?text=${this.state.title}&url=${window.location.href}&hashtags=${this.state.tags}`}
            className="share-btn"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href={`http://pinterest.com/pin/create/button/?url=${window.location.href}&media=${this.state.image}&description=${this.state.caption}`}
            className="share-btn"
          >
            <FontAwesomeIcon icon={faPinterestP} />
          </a>
          <a
            href={`http://www.linkedin.com/shareArticle?url=${window.location.href}&title=${this.state.title}`}
            className="share-btn"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href={`mailto:?subject=${this.state.title}&body=Found this amazing recipe on Rasoi Tak: ${window.location.href} `}
            className="share-btn"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <iframe
          src={this.state.video}
          allowFullScreen
          frameBorder="0"
          title="Embedded Youtube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <Row className="post-body">
          <Col sm={6}>
            <Row className="headers">Ingredients</Row>
            <Row>
              <ul>
                {this.state.ing.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="headers">Method</Row>
            <Row>
              <ul>
                {this.state.method.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </Row>
          </Col>
        </Row>
        <Slider title="Related Posts" data={this.state.related} />
      </div>
    );
  }
}

export default post;
