import { combineReducers } from "redux";
import listMovieReducer from "./../../containers/HomeTemplate/ListMoviePage/modules/reducer";
import detailMovieReducer from "./../../containers/HomeTemplate/DetailMoviePage/modules/reducer";
import loginReducer from "../../containers/HomeTemplate/RegisterPage/Signin/modules/reducer";
import signupReducer from "../../containers/HomeTemplate/RegisterPage/Signup/modules/reducer";
import listCinemaReducer from "./../../containers/HomeTemplate/HomePage/HomeCinemaComplex/modules/reducer";
import listRoomReducer from "./../../containers/HomeTemplate/BookingTicket/modules/reducer";
import bookingTicketReducer from "./../../containers/HomeTemplate/BookingTicket/CheckOut/modules/reducer";
import infoReducer from "./../../containers/HomeTemplate/InfoAcc/Change/modules/reducer";

const rootReducer = combineReducers({
  listMovieReducer,
  detailMovieReducer,
  loginReducer,
  signupReducer,
  listCinemaReducer,
  listRoomReducer,
  bookingTicketReducer,
  infoReducer,
});

export default rootReducer;
