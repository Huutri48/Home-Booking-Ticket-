import * as ActionType from "./constants";

let initialState = {
  loading: false,
  data: null,
  error: null,
  arrComplex: null,
  arrShowTimes: null,
};

const listCinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_CINEMA_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.LIST_CINEMA_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;

      return { ...state };

    case ActionType.LIST_CINEMA_COMPLEX_SUCCESS:
      state.arrComplex = action.data;
      state.error = null;
      return { ...state };

    case ActionType.LIST_SHOWTIMES_SUCCESS:
      state.arrShowTimes = action.data;

      state.error = null;
      state.arrShowTimes.map((item) =>
        item.lstCumRap.map((item, index) =>
          item.danhSachPhim.map((item, index1) => {
            let arr = item.lstLichChieuTheoPhim.filter((item) => {
              return (
                new Date(item.ngayChieuGioChieu) >= new Date()
              );
            });
            state.arrShowTimes[0].lstCumRap[index].danhSachPhim[
              index1
            ].lstLichChieuTheoPhim = arr;
          })
        )
      );

      return { ...state };

    case ActionType.LIST_CINEMA_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listCinemaReducer;
