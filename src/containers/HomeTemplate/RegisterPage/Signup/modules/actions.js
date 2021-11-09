import * as ActionType from "./constants";
import api from "utils/apiUtils";
import swal from "sweetalert";
export const actSignUp = (user) => {
  let accessToken = "";
  if (localStorage.getItem("User")) {
    accessToken = JSON.parse(localStorage.getItem("User")).accessToken;
  }

  return async (dispatch) => {
    try {
      dispatch(actSignUpRequest());
      const result = await api.post("QuanLyNguoiDung/DangKy", user);
      if (result.statusText === "OK") {
        dispatch(actSignUpSuccess(result.data));
        swal({
          title: "Tạo Thành Công!",
          text: "Vui Lòng Đăng Nhập!",
          icon: "success",
          timer: 10000,
        });
        document
          .getElementById("login")
          .parentNode.parentNode.classList.remove("slide-up");
        document.getElementById("signUp").classList.add("slide-up");
      } else {
        dispatch(actSignUpFailed(result));
      }
    } catch (error) {
      swal({
        title: error.response?.data,
        icon: "error",
        timer: 10000,
      });
    }
  };
};

const actSignUpRequest = () => {
  return {
    type: ActionType.SIGNUP_REQUEST,
  };
};

const actSignUpSuccess = (data) => {
  return {
    type: ActionType.SIGNUP_SUCCESS,
    payload: data,
  };
};

const actSignUpFailed = (error) => {
  return {
    type: ActionType.SIGNUP_FAILED,
    payload: error,
  };
};
