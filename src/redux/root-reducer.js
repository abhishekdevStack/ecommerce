import { combineReducers } from "redux";

import userReducers from "./users/user.reducer.jsx";
import cartReducer from "./cart/cart.reducer";
export default combineReducers({
  user: userReducers,
  cart: cartReducer,
});
