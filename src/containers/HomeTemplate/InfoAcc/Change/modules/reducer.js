import * as ActionType from "./constants";

let initialState = {
  loading: false,
  data: null,
  error: null,
  success: null,
  purchase: null,
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INFO_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.INFO_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.success = "Success";
      return { ...state };

    case ActionType.INFO_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;

      return { ...state };
    case ActionType.PURCHASE_SUCCESS:
      state.loading = false;
      state.purchase = action.purchase;
    
      return { ...state };

    case ActionType.INFO_CLEAR_DATA:
      state.loading = false;
      state.data = null;
      state.error = null;

      return { ...state };

    default:
      return { ...state };
  }
};

export default infoReducer;
