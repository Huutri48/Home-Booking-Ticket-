import React, { Component } from "react";
import {
  actFetchListCinema,
  actFetchListCinemaComplex,
  actFetchListShowTimes,
} from "./modules/actions";
import moment from "moment";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { Link } from "react-router-dom";
import { Collapse } from "antd";
import LazyLoad from "react-lazyload";
let arrDate = [];
const { TabPane } = Tabs;
const { Panel } = Collapse;
class listCinema extends Component {
  componentWillMount() {
    this.props.fetchData();
  }
  componentDidMount() {
    this.props.fetchData2("BHDStar");
  }

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };
  renderDate(date, index) {
    if (index === 0) {
      arrDate = [];
    }

    if (arrDate.indexOf(moment(date).format("DD/MM/YYYY")) === -1) {
      arrDate.push(moment(date).format("DD/MM/YYYY"));
      return <>{moment(date).format("DD/MM/YYYY")}</>;
    }
  }
  renderListCinemaComplex() {
    const { data, arrShowTimes } = this.props;

    return data?.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <TabPane
            tab={
              <img
                src={item.logo.replace("http:", "https:")}
                className="rounded-circle"
                height="60"
                onClick={() => {
                  this.props.fetchData2(item.maHeThongRap);
                }}
              />
            }
            key={index}
          >
            <Tabs className="leftr" tabPosition="left">
              {arrShowTimes?.map((item1, index1) => {
                return item1.lstCumRap.map((item2, index2) => {
                  return (
                    <React.Fragment key={index1}>
                      <TabPane
                        className="align-top"
                        tab={
                          <div className="cumrap d-flex align-middle">
                            <img
                              src={item.logo.replace("http:", "https:")}
                              className="rounded-circle text-start"
                              height="50"
                            />
                            <br />
                            <div className="content text-start  ms-4">
                              <p className="mb-0">{item2.tenCumRap}</p>
                              <p
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={item2.diaChi}
                              >
                                {item2.diaChi}
                              </p>
                            </div>
                          </div>
                        }
                        key={index2}
                      >
                        {item2.danhSachPhim.map((item3, index3) => {
                          return (
                            <div className="d-flex movies" key={index3}>
                              <img
                                width="45px"
                                height="65px"
                                src={item3.hinhAnh.replace("http:", "https:")}
                              />
                              <div className="ms-3">
                                <p>
                                  <span className="ageType mb-0">C16</span>{" "}
                                  {item3.tenPhim}
                                </p>
                                <div className="row">
                                  {item3.lstLichChieuTheoPhim.join() !== "" ? (
                                    item3.lstLichChieuTheoPhim
                                      .sort((a, b) => {
                                        return (
                                          new Date(a.ngayChieuGioChieu) -
                                          new Date(b.ngayChieuGioChieu)
                                        );
                                      })
                                      .map((item4, index4) => {
                                        return (
                                          <div key={index4}>
                                            <p className="text-white">
                                              {this.renderDate(
                                                item4?.ngayChieuGioChieu,
                                                index4
                                              )}
                                            </p>

                                            <button className="button2">
                                              <Link
                                                to={`/bookingticket/${item4.maLichChieu}`}
                                              >
                                                {moment(
                                                  item4?.ngayChieuGioChieu
                                                ).format("LT")}
                                              </Link>
                                            </button>
                                          </div>
                                        );
                                      })
                                  ) : (
                                    <p>Đang Cập Nhật</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    </React.Fragment>
                  );
                });
              })}
            </Tabs>
          </TabPane>
        </React.Fragment>
      );
    });
  }

  render() {
    arrDate = [];
    const { data, arrComplex, arrShowTimes } = this.props;

    return (
      <LazyLoad>
        <div className="cinemaComplex">
          <div className="container">
            <h1 className="mb-5">Cinema Complex</h1>
            <div className="animate__animated animate__bounceIn">
              <Tabs style={{ height: "500px" }} tabPosition="top" centered>
                {this.renderListCinemaComplex()}
              </Tabs>
            </div>
          </div>
        </div>{" "}
      </LazyLoad>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.listCinemaReducer.loading,
    data: state.listCinemaReducer.data,
    arrComplex: state.listCinemaReducer.arrComplex,
    arrShowTimes: state.listCinemaReducer.arrShowTimes,
    arrShowTimes2: state.listCinemaReducer.arrShowTimes2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(actFetchListCinema());
    },
    fetchData1: (id) => {
      dispatch(actFetchListCinemaComplex(id));
    },
    fetchData2: (id) => {
      dispatch(actFetchListShowTimes(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(listCinema);
