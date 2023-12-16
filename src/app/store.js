import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
export default store;
