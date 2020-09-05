import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
  faPinterest,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const footer = () => {
  return (
    <footer>
      <h3>Connect With Us!!</h3>
      <Row className="w-100">
        <Col md={{ span: 1, offset: 3 }} xs>
          <a href="https://www.facebook.com/rasoitak1/">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              color="#ffaa00"
              className="footer-icons"
            />
          </a>
        </Col>
        <Col md={1} xs>
          <a href="https://www.instagram.com/rasoitak/">
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              color="#ffaa00"
              className="footer-icons"
            />
          </a>
        </Col>
        <Col md={1} xs>
          <a href="https://twitter.com/RasoiTak">
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              color="#ffaa00"
              className="footer-icons"
            />
          </a>
        </Col>
        <Col md={1} xs>
          <a href="https://www.youtube.com/c/RasoiTak">
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              color="#ffaa00"
              className="footer-icons"
            />
          </a>
        </Col>
        <Col md={1} xs>
          <a href="https://in.pinterest.com/rasoitak/pins/">
            <FontAwesomeIcon
              icon={faPinterest}
              size="2x"
              color="#ffaa00"
              className="footer-icons"
            />
          </a>
        </Col>
        <Col md={1} xs>
          <a href="https://www.linkedin.com/company/28727550/admin/?welcome=true">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              color="#ffaa00"
              className="footer-icons"
            />
          </a>
        </Col>
      </Row>
      <span>&copy;2020 Rasoi Tak, All Right Reserved</span>
    </footer>
  );
};

export default footer;
