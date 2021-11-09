import { data } from "jquery";
import * as ActionType from "./constants";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

const detailMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.DETAIL_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.DETAIL_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.data.lichChieu = state.data.lichChieu.filter((item) => {
        return new Date(item.ngayChieuGioChieu) >= new Date();
      });
     
      state.error = null;
      return { ...state };

    case ActionType.DETAIL_MOVIE_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default detailMovieReducer;
