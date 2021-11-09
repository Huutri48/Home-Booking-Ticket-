import * as ActionType from "./constants";
import api from "utils/apiUtils";

export const actFetchListCinema = () => {
  return (dispatch) => {
    dispatch(actListCinemaRequest());
    api
      .get("QuanLyRap/LayThongTinHeThongRap")
      .then((result) => {
        dispatch(actListCinemaSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actListCinemaFailed(err));
      });
  };
};
export const actFetchListCinemaComplex = (id) => {
  return (dispatch) => {
    api
      .get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`)
      .then((result) => {
        dispatch(actListCinemaComplexSuccess(result.data));
      })
      .catch((err) => {});
  };
};

export const actFetchListShowTimes = (id) => {
  return (dispatch) => {
    api
      .get(
        `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP09`
      )
      .then((result) => {
        dispatch(actListShowTimesSuccess(result.data));
      })
      .catch((err) => {});
  };
};

const actListCinemaRequest = () => {
  return {
    type: ActionType.LIST_CINEMA_REQUEST,
  };
};

const actListCinemaSuccess = (data) => {
  return {
    type: ActionType.LIST_CINEMA_SUCCESS,
    payload: data,
  };
};
const actListCinemaComplexSuccess = (data) => {
  return {
    type: ActionType.LIST_CINEMA_COMPLEX_SUCCESS,
    data: data,
  };
};
const actListShowTimesSuccess = (data) => {
  return {
    type: ActionType.LIST_SHOWTIMES_SUCCESS,
    data: data,
  };
};

const actListCinemaFailed = (data) => {
  return {
    type: ActionType.LIST_CINEMA_FAILED,
    payload: data,
  };
};
