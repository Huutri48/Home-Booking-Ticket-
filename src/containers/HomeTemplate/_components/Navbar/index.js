import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { actLogout } from "../../RegisterPage/Signin/modules/actions";
import { connect } from "react-redux";
import swal from "sweetalert";


class NavBar extends Component {
  renderButton() {
    return JSON.parse(localStorage.getItem("User")) ? (
      <React.Fragment>
        <button
          className="button1 me-lg-3"
          onClick={() => {
            swal({
              title: "Bạn có muốn đăng xuất ?",
              icon: "warning",
              buttons: ["Hủy", "Xác Nhận"],
              dangerMode: true,
            }).then((check) => {
              if (check) {
                swal("Đã đăng xuất", {
                  icon: "success",
                  timer: 10000,
                });
                this.props.logout(this.props.history);
              } else {
              }
            });
          }}
        >
          Log Out
        </button>
      </React.Fragment>
    ) : (
      <button className="button1 me-lg-3">
        {" "}
        <NavLink className="nav-link p-0 text-white" to="/register">
          Log In
        </NavLink>
      </button>
    );
  }
  removeAccents() {
    let str = JSON.parse(localStorage.getItem("User")).hoTen.toUpperCase();
    const AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
  renderUsername() {
    return JSON.parse(localStorage.getItem("User")) ? (
      <li className="nav-item right-nav pe-xl-5 ps-xl-5 pe-lg-3 ps-lg-3  ">
        <NavLink
          exact
          className="nav-link"
          to="/information"
          title="Your Information"
        >
          Hi, {this.removeAccents()}
        </NavLink>
      </li>
    ) : (
      ""
    );
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-expand-lg animate__animated  animate__fadeIn">
          <div className="container-fluid justify-content-lg-start ">
            <NavLink
              exact
              activeClassName="active"
              className="navbar-brand  ps-xl-5"
              to="/"
            >
              <div className="sign">
                <span className="flicker1">Ci</span>
                <span className="flicker2">ne</span>
                <span className="flicker3">ma</span>
              </div>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="fas fa-bars lh-base" />
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0 ">
                <li className="nav-item pe-xl-5 ps-xl-5 pe-lg-3 ps-lg-3  ">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item pe-xl-5 ps-xl-5 pe-lg-3 ps-lg-3  ">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/list-movie"
                  >
                    ListMovie
                  </NavLink>
                </li>
                <li className="nav-item pe-xl-5 ps-xl-5 pe-lg-3 ps-lg-3 ">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/support"
                  >
                    Support
                  </NavLink>
                </li>
                {this.renderUsername()}
              </ul>
              {this.renderButton()}
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => {
      dispatch(actLogout(history));
    },
  };
};

const ConnectedComponent = connect(null, mapDispatchToProps)(NavBar);

export default withRouter(ConnectedComponent);
