import React, { Component } from "react";
import slide1 from "./../../../../assets/img/banner1.png";
import slide2 from "./../../../../assets/img/banner2.png";
import Slider from "react-slick";
export default class HomeSlider extends Component {
  render() {
    const setting1 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      cssEase: "linear",
      autoplay: true,
      swipeToSlide: true,
      pauseOnHover: true,
      customPaging: () => <i className="fas fa-star" />,
    };
    return (
      <div className="homeSlider animate__animated animate__bounceIn">
        <Slider {...setting1}>
          <img
            className="img-fluid "
            src={slide1}
            alt="Lỗi Tải Ảnh"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ats.com.vn/wp-content/themes/brixel/images/No-Image-Found-400x264.png";
            }}
          />
          <img
            className="img-fluid"
            src={slide2}
            alt="Lỗi Tải Ảnh"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ats.com.vn/wp-content/themes/brixel/images/No-Image-Found-400x264.png";
            }}
          />
        </Slider>
      </div>
    );
  }
}
