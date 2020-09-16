import React from "react";
import { Row, Col } from "react-bootstrap";

const about = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm="4">
          <img src="/myimage.jpg" alt="my pic" className="about-pic" />
        </Col>
        <Col>
          <h2 className="common-title mx-0">About Me</h2>
          <div className="about-body">
            Hello everyone, my name is Ritu Gupta. I started posting recipes
            online in 2018. I am a housewife by profession and made this blog
            out of simple love for food. I also love to make videos for recipes
            and post them on Youtube. You can check out my Youtube Channel{" "}
            <a href="https://www.youtube.com/c/RasoiTak" className="about-link">
              Right Here
            </a>
            .
          </div>
          <div className="about-body">
            I am a vegetarian by choice and love to try famous dishes from all
            over the world and then make them my own way in a style that makes
            them easy to try at home for anyone.
          </div>
          <div className="about-body">
            Thanks A Lot for visiting my page, If you have not checked out my
            blog you can find all my recipes{" "}
            <a href="/menu" className="about-link">
              Right Here
            </a>
            .
          </div>
          <div className="about-body">
            Also I would love to hear from you. Find me on Social Media by the
            name Rasoi Tak or simply follow the links provided below. You can
            even mail at my email.
          </div>
          <div className="about-body">
            <p className="about-mail">
              <a href="mailto: rasoitak2020@gmail.com" className="about-link">
                E-mail:
              </a>{" "}
              rasoitak2020@gmail.com
            </p>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default about;
