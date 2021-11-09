import * as ActionType from "./constants";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGNUP_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.SIGNUP_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = "1";
      return { ...state };

    case ActionType.SIGNUP_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;

      return { ...state };

    case ActionType.SIGNUP_CLEAR_DATA:
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state };

    default:
      return { ...state };
  }
};

export default signupReducer;
