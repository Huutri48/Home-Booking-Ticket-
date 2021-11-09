import api from "utils/apiUtils";
import * as ActionType from "./constants";
import setHeader from "utils/setHeader";
import swal from "sweetalert";
export const actInfo = (user) => {
  let accessToken = "";
  if (localStorage.getItem("User")) {
    accessToken = JSON.parse(localStorage.getItem("User")).accessToken;
    setHeader(accessToken);
  }

  return async (dispatch) => {
    try {
      dispatch(actInfoRequest());
      const result = await api.put(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user
      );

      if (result.statusText === "OK") {
        swal({
          title: "Đổi Thành Công!",
          icon: "success",
          timer: 10000,
        });
        dispatch(actInfoSuccess(result.data));
      } else {
        dispatch(actInfoFailed(result));
      }
    } catch (error) {
      swal({
        title: error.response?.data,
        icon: "error",
        timer: 10000,
      });
      dispatch(actInfoFailed(error));
    }
  };
};
export const actPurchaseHistory = (user) => {
  return async (dispatch) => {
    try {
      dispatch(actInfoRequest());
      const result = await api.post("QuanLyNguoiDung/ThongTinTaiKhoan", user);

      if (result.statusText === "OK") {
        dispatch(actPurchase(result.data));
      } else {
        dispatch(actInfoFailed(result));
      }
    } catch (error) {
      dispatch(actInfoFailed(error));
    }
  };
};

const actPurchase = (data) => {
  return {
    type: ActionType.PURCHASE_SUCCESS,
    purchase: data,
  };
};
const actInfoRequest = () => {
  return {
    type: ActionType.INFO_REQUEST,
  };
};

const actInfoSuccess = (data) => {
  return {
    type: ActionType.INFO_SUCCESS,
    payload: data,
  };
};

const actInfoFailed = (data) => {
  return {
    type: ActionType.INFO_FAILED,
    payload: data,
  };
};
