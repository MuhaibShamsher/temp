import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./auth/authSlice";
import assetDataSlice from "./assetsData/assetsDataSlice";

const rootReducer = combineReducers({
  authReducer: authSliceReducer,
  // assets: assetDataSlice,
});

export default rootReducer;
