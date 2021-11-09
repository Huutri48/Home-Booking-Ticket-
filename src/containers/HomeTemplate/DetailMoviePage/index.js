import React, { Component } from "react";
import { actFecthDetailMovie } from "./modules/actions";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader";
import { Tabs } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;
let arrRap,
  arrDate = [];
class DetailMoviePage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchDetailMovie(id);
  }

  renderDate(date, index) {
    if (index === 0) {
      arrDate = [];
    }
    if (arrDate.indexOf(moment(date).format("DD/MM/YYYY")) === -1) {
      arrDate.push(moment(date).format("DD/MM/YYYY"));
      return <p>{moment(date).format("DD/MM/YYYY")}</p>;
    }
  }
  callback(key) {
    console.log(key);
  }
  renderTable = () => {
    const { data } = this.props;
    if (data?.lichChieu.length !== 0) {
      return data?.lichChieu
        ?.sort((a, b) => {
          return a.thongTinRap.tenCumRap - b.thongTinRap.tenCumRap;
        })
        .map((item, index) => {
          if (index === 0) {
            arrRap = [];
          }

          if (arrRap.indexOf(item.thongTinRap.tenCumRap) === -1) {
            arrRap.push(item.thongTinRap.tenCumRap);
            return (
              <TabPane
                className="animate__animated animate__zoomIn"
                tab={
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="You Can Scroll To See More"
                  >
                    {item.thongTinRap.tenCumRap}
                  </span>
                }
                key={index}
              >
                <div className="textContent">
                  {data?.lichChieu
                    ?.filter((item1) => {
                      return (
                        item1.thongTinRap.tenCumRap ===
                        item.thongTinRap.tenCumRap
                      );
                    })
                    ?.sort((a, b) => {
                      return (
                        new Date(a.ngayChieuGioChieu) -
                        new Date(b.ngayChieuGioChieu)
                      );
                    })
                    .map((item, index) => {
                      return (
                        <div key={index}>
                          {this.renderDate(item.ngayChieuGioChieu, index)}
                          <button className="button2">
                            {" "}
                            <Link to={`/bookingticket/${item.maLichChieu}`}>
                              {moment(item?.ngayChieuGioChieu).format("LT")}
                            </Link>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </TabPane>
            );
          }
        });
    }
    return (
      <>
        <TabPane tab="Đang Cập Nhật" key="1">
          <div className="textContent">Đang Cập Nhật</div>
        </TabPane>
      </>
    );
  };

  render() {
    const { loading, data } = this.props;
    const resultFind = data?.trailer.replace("watch?v=", "embed/");
    const result1 = resultFind?.replace("youtu.be/", "youtube.com/embed/");
    if (loading) return <Loader />;
    return (
      <div className=" detailMovie">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12 animate__animated animate__bounceInLeft">
              <div className="item">
                <img
                  className="img-fluid"
                  src={data && data.hinhAnh.replace("http:", "https:")}
                  alt=""
                />
                <div className="content1">
                  <div>
                    <i
                      className="fas fa-play"
                      data-bs-toggle="modal"
                      data-bs-target={"#" + data?.biDanh}
                      onClick={() => {
                        document
                          .getElementById(`${data?.biDanh}1`)
                          .setAttribute("src", `${result1}`);
                      }}
                    />

                    <p>{data && data.tenPhim}</p>
                    <p> {moment(data?.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9 col-12 mt-md-0 mt-5 animate__animated animate__bounceInRight">
              <Tabs defaultActiveKey="1" centered tabPosition="top" type="card">
                <TabPane
                  className="animate__animated animate__lightSpeedInRight"
                  tab="Lịch Chiếu"
                  key="1"
                >
                  <Tabs
                    type="card"
                    onChange={this.callback()}
                    tabPosition="top"
                  >
                    {this.renderTable()}
                  </Tabs>
                </TabPane>
                <TabPane
                  className="animate__animated animate__lightSpeedInLeft"
                  tab="Thông Tin"
                  key="2"
                >
                  <div className="row text-start mt-3 p-3">
                    <div className="col-md-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Ngày Chiếu:</th>
                            <th>
                              {moment(data?.ngayKhoiChieu).format("DD/MM/YYYY")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Giờ Chiếu:</td>
                            <td>{moment(data?.ngayKhoiChieu).format("LT")}</td>
                          </tr>
                          <tr>
                            <td>Đánh Giá:</td>
                            <td>
                              {data && data.danhGia}{" "}
                              <i className="fas fa-star"></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-7">
                      <div className="textContent">
                        <p>Mô Tả:</p>
                        <p>{data && data.moTa}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="button2"
                    data-bs-toggle="modal"
                    data-bs-target={"#" + data?.biDanh}
                    onClick={() => {
                      document
                        .getElementById(`${data?.biDanh}1`)
                        .setAttribute("src", `${result1}`);
                    }}
                  >
                    Trailer
                  </button>
                </TabPane>
              </Tabs>
            </div>
            {/* Trailer */}
            <div
              className="modal fade"
              id={data?.biDanh}
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              onClick={() => {
                document
                  .getElementById(`${data?.biDanh}1`)
                  .setAttribute("src", "");
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
                      id={data?.biDanh + "1"}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.detailMovieReducer.loading,
    data: state.detailMovieReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailMovie: (id) => {
      dispatch(actFecthDetailMovie(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMoviePage);
