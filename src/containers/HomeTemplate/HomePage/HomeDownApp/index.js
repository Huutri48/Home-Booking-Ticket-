import React, { Component } from "react";

import Slider from "react-slick";
import img1 from "./../../../../assets/img/slide1.jpg";
import img2 from "./../../../../assets/img/slide2.jpg";
import img3 from "./../../../../assets/img/slide3.jpg";
import img4 from "./../../../../assets/img/slide4.jpg";
import img5 from "./../../../../assets/img/slide5.jpg";
import img6 from "./../../../../assets/img/slide6.jpg";
import img7 from "./../../../../assets/img/slide7.jpg";
import img8 from "./../../../../assets/img/slide8.jpg";
import img13 from "./../../../../assets/img/slide13.jpg";
import img14 from "./../../../../assets/img/slide14.jpg";
import img15 from "./../../../../assets/img/slide15.jpg";
import img16 from "./../../../../assets/img/slide16.jpg";
import img from "./../../../../assets/img/mobile.png";
export default class HomeDownApp extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 3000,
      cssEase: "linear",
    };
    return (
      <div className="HomeDownApp ">
        <div className="container animate__animated animate__bounceIn">
          <div className="row">
            <div className="col-12 col-md-7 ps-5 pe-5 text-md-start text-center">
              <h1 className="text-white mb-4">
                Ứng dụng tiện lợi dành cho người yêu điện ảnh
              </h1>
              <p className="text-white mb-4">
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <div>
                <button className="button1 mb-3">TẢI VỀ NGAY</button>
              </div>

              <p className="text-white">
                TIX có hai phiên bản{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                >
                  IOS{" "}
                </a>
                &
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                >
                  {" "}
                  Android
                </a>
              </p>
            </div>
            <div className="mobile col-12 col-md-5 p-0">
              <div className="notch-container">
                <div className="notch"></div>
              </div>
              <Slider {...settings}>
                <img src={img1} alt="" />
                <img src={img2} alt="" />
                <img src={img3} alt="" />
                <img src={img4} alt="" />
                <img src={img5} alt="" />
                <img src={img6} alt="" />
                <img src={img7} alt="" />
                <img src={img8} alt="" />
                <img src={img13} alt="" />
                <img src={img14} alt="" />
                <img src={img15} alt="" />
                <img src={img16} alt="" />
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
