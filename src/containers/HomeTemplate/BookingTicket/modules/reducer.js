import * as ActionType from "./constants";

let initialState = {
  loading: false,
  data: null,
  error: null,
  danhSachGheDangDat: [],
};

const listRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_ROOM_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      state.danhSachGheDangDat = [];
      return { ...state };

    case ActionType.LIST_ROOM_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.LIST_ROOM_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    case ActionType.datGhe: {
      let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
      danhSachGheDangDatUpdate.push(action.ghe);
      state.danhSachGheDangDat = danhSachGheDangDatUpdate;
      return { ...state };
    }
    case ActionType.huyGhe: {
      let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
      let index = danhSachGheDangDatUpdate.findIndex((item) => {
        return item.stt === action.soGhe.stt;
      });
      danhSachGheDangDatUpdate?.splice(index, 1);
      state.danhSachGheDangDat = danhSachGheDangDatUpdate;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default listRoomReducer;
