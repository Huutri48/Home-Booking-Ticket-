import * as ActionType from "./constants";

let initialState = {
  loading: false,
  data: null,
  error: null,
  arrFilmdangChieu: [],
  arrFilmsapChieu: [],
};

const listMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.LIST_MOVIE_SUCCESS:
      state.loading = false;
      state.error = null;
      state.arrFilmdangChieu = [];
      state.arrFilmsapChieu = [];
      action.payload.forEach((film) => {
        if (
          new Date(film.ngayKhoiChieu) > new Date("2020-10-15") &&
          new Date(film.ngayKhoiChieu) <= new Date()
        ) {
          state.arrFilmdangChieu.push(film);
        }
        if (new Date(film.ngayKhoiChieu) > new Date()) {
          state.arrFilmsapChieu.push(film);
        }
      });
      state.data = null;
      state.data = state.arrFilmdangChieu;
      return { ...state };

    case "DangChieu": {
      state.data = null;
      state.data = state.arrFilmdangChieu;

      return { ...state };
    }

    case "SapChieu": {
      state.data = null;
      state.data = state.arrFilmsapChieu;
      return { ...state };
    }

    case ActionType.LIST_MOVIE_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listMovieReducer;
