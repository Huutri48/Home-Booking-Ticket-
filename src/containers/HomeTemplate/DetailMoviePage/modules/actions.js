import * as ActionType from "./constants";

import api from "utils/apiUtils";
export const actFecthDetailMovie = (id) => {
  return (dispatch) => {
    dispatch(actDetailMovieRequest());

    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actDetailMovieSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actDetailMovieFailed(err));
      });
  };
};

const actDetailMovieRequest = () => {
  return {
    type: ActionType.DETAIL_MOVIE_REQUEST,
  };
};

const actDetailMovieSuccess = (data) => {
  return {
    type: ActionType.DETAIL_MOVIE_SUCCESS,
    payload: data,
  };
};

const actDetailMovieFailed = (err) => {
  return {
    type: ActionType.DETAIL_MOVIE_FAILED,
    payload: err,
  };
};
