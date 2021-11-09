import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MovieItem extends Component {
  render() {
    const { movie } = this.props;
    let urlMovie = movie.trailer;
    const resultFind = urlMovie?.replace("watch?v=", "embed/");
    const result1 = resultFind?.replace("youtu.be/", "youtube.com/embed/");
    const result2 = movie?.hinhAnh.replace("http:", "https:");

    return (
      <div className="card">
        <img
          className="img-fluid"
          src={result2}
          alt="Lỗi Tải Ảnh"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://ats.com.vn/wp-content/themes/brixel/images/No-Image-Found-400x264.png";
          }}
        />
        <div className="face face2">
          <Link
            to={`/detail/${movie.maPhim}`}
            data-toggle="tooltip"
            title={movie.tenPhim}
          >
            <h2>{movie.tenPhim}</h2>
          </Link>

          <div className="trailer text-center">
            <i
              className="far fa-play-circle btn"
              data-toggle="tooltip"
              title="Play Trailer"
              data-bs-toggle="modal"
              
              data-bs-target={"#" + movie.biDanh}
              onClick={() => {
                document
                  .getElementById(`${movie.biDanh}1`)
                  .setAttribute("src", `${result1}`);
              }}
            />
          </div>

          <span className="text-white me-3">
            <i className="fas fa-star"></i> {movie.danhGia}
          </span>
          <Link to={`/detail/${movie.maPhim}`}>
          <button
            className={window.innerWidth < 576 ? "button3" : "button1"}
          >
            Buy 
          </button>
          </Link>
        </div>
        {/* Trailer */}
        <div
          className="modal fade"
          id={movie.biDanh}
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          onClick={() => {
            document.getElementById(`${movie.biDanh}1`).setAttribute("src", "");
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered justify-content-center"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-body ratio ratio-4x3 ">
                <div className="btnclose">
                  <i
                    className="fas fa-times-circle btn  "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <iframe
                  id={movie.biDanh + "1"}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
