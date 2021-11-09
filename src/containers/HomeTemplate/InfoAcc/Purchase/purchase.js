import React, { Component } from "react";
import { actPurchaseHistory } from "./../Change/modules/actions";
import { connect } from "react-redux";
import Loader from "./../../../../components/Loader/index";
import moment from "moment";
let arrRap = [];
let arrNumberRap = [];
class Purchase extends Component {
  renderRap(tenRap, index) {
    if (index === 0) {
      arrRap = [];
    }

    if (arrRap.indexOf(tenRap) === -1) {
      arrRap.push(tenRap);
      return (
        <h3 data-bs-toggle="tooltip" title={tenRap}>
          {tenRap}
        </h3>
      );
    }
  }
  renderNumberRap(tenRap, index) {
    if (index === 0) {
      arrNumberRap = [];
    }

    if (arrNumberRap.indexOf(tenRap) === -1) {
      arrNumberRap.push(tenRap);
      return <h4>{tenRap}</h4>;
    }
  }

  renderPurchase() {
    const purchase = this.props.purchase;
    if (purchase?.thongTinDatVe.length !== 0) {
      return purchase?.thongTinDatVe.reverse().map((item, index) => {
        return (
          <div
            className="col-12 col-sm-6  col-lg-4 col-xl-3 purchase"
            key={index}
            data-toggle="tooltip"
            title="Click Vào Đây Để Xem Ghế"
          >
            <div
              className="topPurchase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#purchase${item.maVe}`}
              aria-expanded="false"
              aria-controls={`purchase${item.maVe}`}
            >
              <div className="ticket">
                <div className="item">
                  <h1 data-bs-toggle="tooltip" title={item.tenPhim}>
                    {item.tenPhim}
                  </h1>
                  <h3>
                    <i className="fas fa-calendar-alt" />
                    {moment(item.ngayDat).format("DD/MM/YYYY")}
                  </h3>
                  <h3 className="ms-3 ">
                    <i className="fas fa-hourglass" />
                    {item.thoiLuongPhim}
                  </h3>
                  <div className="mt-3">
                    <h3>
                      <i className="far fa-clock" />
                      {moment(item.ngayDat).format("LT")}
                    </h3>
                    <h3 className="ms-3">
                      <i className="fas fa-dollar-sign" />

                      {item.giaVe
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse" id={`purchase${item.maVe}`}>
              <div className="card card-body">
                {item?.danhSachGhe.map((item1, index1) => {
                  return (
                    <React.Fragment key={index1}>
                      {this.renderRap(item1.tenHeThongRap, index1)}

                      {this.renderNumberRap(item1.tenCumRap, index1)}
                    </React.Fragment>
                  );
                })}
                <div>
                  <h4>Số Ghế</h4>
                  <h5>
                    {item?.danhSachGhe.map((item1, index1) => {
                      if (item?.danhSachGhe.length === ++index1) {
                        return (
                          <p key={index1} className="seatNumber">
                            {item1.tenGhe}
                          </p>
                        );
                      }
                      return (
                        <p key={index1} className="seatNumber">
                          {item1.tenGhe},
                        </p>
                      );
                    })}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <p style={{ fontFamily: "Georama, sans-serif" }} className="text-center">
        Hãy đặt vé ngay!
      </p>
    );
  }
  render() {
    if (this.props.loading) return <Loader />;

    return <div className="row">{this.renderPurchase()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    purchase: state.infoReducer.purchase,
    loading: state.infoReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (user) => {
      dispatch(actPurchaseHistory(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
