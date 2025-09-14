import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/store/reducers/user";
import favoriteReducer from "@/store/reducers/favorite";
export default combineReducers({
  userReducer,
  favoriteReducer,
});
