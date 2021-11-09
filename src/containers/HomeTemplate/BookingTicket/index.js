import React, { Component } from "react";
import { actFetchListRoom, datGhe, huyGhe } from "./modules/action";
import { connect } from "react-redux";
import Loader from "./../../../components/Loader";
import CheckOut from "./CheckOut/index";
import { Redirect } from "react-router-dom";

class BookingTicket extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchListRoom(id);
  }

  renderSeat() {
    const { data } = this.props;
    return data?.danhSachGhe.map((item, index) => {
      switch (item.daDat) {
        case true:
          return (
            <div className="seat">
              <button className="seatDaDat" key={index}>
                {item.tenGhe}
              </button>
            </div>
          );

        case false:
          if (item.loaiGhe === "Thuong") {
            return (
              <div className="seat">
                <button
                  key={index}
                  id={index}
                  className="seatTrong"
                  onClick={() => {
                    if (
                      document
                        .getElementById(index)
                        .className.includes("seatTrong")
                    ) {
                      return (
                        (document.getElementById(index).className =
                          "seatDangChon"),
                        this.props.datGhe(item)
                      );
                    }
                    return (
                      (document.getElementById(index).className = "seatTrong"),
                      this.props.huyGhe(item)
                    );
                  }}
                >
                  {item.tenGhe}
                </button>
              </div>
            );
          } else {
            return (
              <div className="seat">
                <button
                  key={index}
                  id={index}
                  className=" seatVip"
                  onClick={() => {
                    if (
                      document
                        .getElementById(index)
                        .className.includes("seatVip")
                    ) {
                      return (
                        (document.getElementById(index).className =
                          "seatDangChon seat1"),
                        this.props.datGhe(item)
                      );
                    }
                    return (
                      (document.getElementById(index).className = "seatVip"),
                      this.props.huyGhe(item)
                    );
                  }}
                >
                  {item.tenGhe}
                </button>
              </div>
            );
          }

        default:
          break;
      }
    });
  }

  render() {
    const { loading, data } = this.props;

    if (loading) return <Loader />;
    if (!localStorage?.getItem("User")) {
      return <Redirect to="/register" />;
    }

    return (
      <div className="BookingTicket">
        <div className="container">
          <div className="row ">
            <div className="col-md-8 col-12 animate__animated animate__bounceInDown">
              <div className="mt-2 ">
                <div className="screen mt-1 text-center">
                  <p className="text-white">screen</p>
                </div>
                <div className="text-center d-flex flex-wrap ">
                  {this.renderSeat()}
                </div>
              </div>
              <div className=" mt-2 row bottomContent">
                <div className=" col-3 text-center">
                  <p className="text-white">Đã Đặt</p>
                  <button
                    style={{ width: "2vw", height: "2vw" }}
                    className="seatDaDat"
                  ></button>
                </div>
                <div className="col-3 text-center">
                  <p className="text-white">Trống</p>

                  <button
                    style={{ width: "2vw", height: "2vw" }}
                    className="seatTrong"
                  ></button>
                </div>
                <div className="col-3 text-center">
                  <p className="text-white">Đang Chọn</p>

                  <button
                    style={{ width: "2vw", height: "2vw" }}
                    className="seatDangChon "
                  ></button>
                </div>
                <div className="col-3 text-center">
                  <p className="text-white">Vip</p>

                  <button
                    style={{ width: "2vw", height: "2vw" }}
                    className="seatVip"
                  ></button>
                </div>
              </div>
            </div>
            <div
              className=" col-md-4 col-12 pe-3 ps-3 animate__animated animate__bounceInUp"
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div className="ticket">
                <div className="ticket__content ">
                  <p className="text-center" style={{ fontWeight: "bolder" }}>
                    {data?.thongTinPhim.tenPhim}
                  </p>
                  <div className="ticketHeader">
                    <p style={{ fontWeight: "bolder" }}>
                      <i className="far fa-clock me-1" />
                      {data?.thongTinPhim.gioChieu}
                    </p>
                    <p style={{ fontWeight: "bolder" }}>
                      <i className="far fa-clock me-1" />
                      {data?.thongTinPhim.ngayChieu}
                    </p>
                  </div>
                  <div
                    className="ticketFooter"
                    style={{ fontWeight: "bolder" }}
                  >
                    <p>{data?.thongTinPhim.tenCumRap}</p>
                    <p>{data?.thongTinPhim.diaChi}</p>
                    <p>{data?.thongTinPhim.tenRap}</p>
                  </div>
                  <CheckOut
                    data={this.props.data}
                    id={this.props.match.params.id}
                    history={this.props.history}
                  />
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
    loading: state.listRoomReducer.loading,
    data: state.listRoomReducer.data,
    danhSachGheDangDat: state.listRoomReducer.danhSachGheDangDat,
    data1: state.bookingTicketReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListRoom: (id) => {
      dispatch(actFetchListRoom(id));
    },
    datGhe: (ghe) => {
      dispatch(datGhe(ghe));
    },
    huyGhe: (ghe) => {
      dispatch(huyGhe(ghe));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTicket);
