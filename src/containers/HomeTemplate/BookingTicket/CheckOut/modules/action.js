import * as ActionType from "./constants";
import api from "utils/apiUtils";
import swal from "sweetalert";
export const actBooking = (user, history) => {
  let accessToken = "";
  if (localStorage.getItem("User")) {
    accessToken = JSON.parse(localStorage.getItem("User")).accessToken;
  }

  return async (dispatch) => {
    try {
      dispatch(actBookingRequest());
      const result = await api.post("QuanLyDatVe/DatVe", user);
      if (result.statusText === "OK") {
        dispatch(actBookingSuccess(result.data));
        swal({
          title: "Đặt Vé Thành Công!",
          text: "Bạn Có Thể Xem Thông Tin Vé Đã Đặt Tại Lịch Sử Mua",
          icon: "success",
        }).then(() => {
          history.replace("/");
        });
      } else {
        dispatch(actBookingFailed(result));
      }
    } catch (error) {
      dispatch(actBookingFailed(error));
    }
  };
};

const actBookingRequest = () => {
  return {
    type: ActionType.BOOKING_TICKET_REQUEST,
  };
};

const actBookingSuccess = (data) => {
  return {
    type: ActionType.BOOKING_TICKET_SUCCESS,
    payload: data,
  };
};

const actBookingFailed = (error) => {
  return {
    type: ActionType.BOOKING_TICKET_FAILED,
    payload: error,
  };
};
