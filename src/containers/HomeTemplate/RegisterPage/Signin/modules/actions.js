import * as ActionType from "./constants";
import api from "utils/apiUtils";
import setHeader from "utils/setHeader";
import swal from "sweetalert";
const TIME_EXP = 120000000;

export const actSignIn = (user, history) => {
  return async (dispatch) => {
    try {
      dispatch(actSignInRequest());
      const result = await api.post("QuanLyNguoiDung/DangNhap", user);

      if (result.statusText === "OK") {
        setHeader(result.data.accessToken);
        const date = new Date().getTime();
        const exp = date + TIME_EXP;
        localStorage.setItem("exp", exp);
        dispatch(actSetTimeoutLogout(history, TIME_EXP));
        localStorage.setItem("User", JSON.stringify(result.data));

        swal({
          title: "Đăng nhập thành công!",
          icon: "success",
          timer: 10000,
        }).then(() => {
          history.goBack();
        });
        dispatch(actSignInSuccess(result.data));
      } else {
        dispatch(actSignInFailed(result));
      }
    } catch (error) {
      swal({
        title: error.response?.data,
        icon: "error",
        timer: 10000,
      });
      dispatch(actSignInFailed(error));
    }
  };
};

export const actTrySignIn = (history) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user) return;

    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();
    if (date > exp) {
      dispatch(actLogout(history));
      return;
    }
    dispatch(actSetTimeoutLogout(history, exp - date));
    setHeader(user.accessToken);
    dispatch(actSignInSuccess(user));
  };
};

export const actLogout = (history) => {
  localStorage.removeItem("User");
  localStorage.removeItem("exp");
  history.replace("/");
  return {
    type: ActionType.SIGNIN_CLEAR_DATA,
  };
};

const actSetTimeoutLogout = (history, expTimeout) => {
  return (distpach) => {
    setTimeout(() => {
      distpach(actLogout(history));
    }, expTimeout);
  };
};

const actSignInRequest = () => {
  return {
    type: ActionType.SIGNIN_REQUEST,
  };
};

const actSignInSuccess = (data) => {
  return {
    type: ActionType.SIGNIN_SUCCESS,
    payload: data,
  };
};

const actSignInFailed = (data) => {
  return {
    type: ActionType.SIGNIN_FAILED,
    payload: data,
  };
};
