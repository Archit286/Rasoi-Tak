import React from "react";
import Card from "./card";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

class slider extends React.Component {
  HandleBlank(data) {
    if (data.title) {
      return <Card post={data} />;
    }
  }

  handleData(data) {
    if (data) {
      return this.props.data.map((item) => (
        <div key={item._id}>{this.HandleBlank(item)}</div>
      ));
    }
  }

  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <React.Fragment>
        <h3 className="common-title">{this.props.title}</h3>
        <Slider {...settings}>{this.handleData(this.props.data)}</Slider>
      </React.Fragment>
    );
  }
}

export default slider;
