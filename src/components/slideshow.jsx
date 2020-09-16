import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const slideshow = () => {
  return (
    <Carousel className="mx-auto my-4">
      <Carousel.Item>
        <img className="d-block w-100" src="/slide1.JPG" alt="Snacks" />
        <Link to="/menu/Snacks">
          <Carousel.Caption>
            <h3>Satisfy your cravings with these mouth-watering snacks</h3>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/slide2.JPG" alt="Desserts" />
        <Link to="/menu/Desserts">
          <Carousel.Caption>
            <h3>Check out these mouth-watering desserts</h3>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/slide3.JPG" alt="Vrat Recipes" />
        <Link to="/menu/Vrat">
          <Carousel.Caption>
            <h3>Try our vrat recipes this Navrati</h3>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

export default slideshow;
