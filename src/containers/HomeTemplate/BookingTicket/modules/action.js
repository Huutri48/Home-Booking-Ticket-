import * as ActionType from "./constants";
import api from "utils/apiUtils";

export const actFetchListRoom = (maLichChieu) => {
  return (dispatch) => {
    dispatch(actListRoomRequest());
    api
      .get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      .then((result) => {
        dispatch(actListRoomSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actListRoomFailed(err));
      });
  };
};
export const datGhe = (ghe) => {
  return {
    type: ActionType.datGhe,
    ghe,
  };
};
export const huyGhe = (soGhe) => {
  return {
    type: ActionType.huyGhe,
    soGhe,
  };
};
const actListRoomRequest = () => {
  return {
    type: ActionType.LIST_ROOM_REQUEST,
  };
};

const actListRoomSuccess = (data) => {
  return {
    type: ActionType.LIST_ROOM_SUCCESS,
    payload: data,
  };
};

const actListRoomFailed = (data) => {
  return {
    type: ActionType.LIST_ROOM_FAILED,
    payload: data,
  };
};
