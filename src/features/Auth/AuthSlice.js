import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BaseEndUrl from "../../../config/config";

const initialState = {
  rest_auth_token: localStorage.getItem("rest_auth_token") || null,
  rest_refresh_token: localStorage.getItem("rest_refresh_token") || null,
  is_auth: localStorage.getItem("is_auth") || false,
  graphql_jwt: localStorage.getItem("graphql_jwt") || null,

  // We can only store the string data in the localstorage, So we have to get the object from the localstorage which we have stored as strings we need to parse it

  user: JSON.parse(localStorage.getItem("user")) || null,
  // here we will add more when needed
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.rest_auth_token = action.payload.access_token;
      localStorage.setItem("rest_auth_token", action.payload.access_token);
      state.rest_refresh_token = action.payload.access_token;
      localStorage.setItem("rest_refresh_token", action.payload.refresh_token);
      state.is_auth = true;
      localStorage.setItem("is_auth", true);
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.graphql_jwt = String(action.payload.graphql_jwt);
      localStorage.setItem("graphql_jwt", String(action.payload.graphql_jwt));
    },
    logout: (state) => {
      state.rest_auth_token = null;
      state.rest_refresh_token = null;
      state.is_auth = false;
      state.user = null;
      localStorage.removeItem("rest_auth_token");
      localStorage.removeItem("rest_refresh_token");
      localStorage.removeItem("is_auth");
      localStorage.removeItem("user");
      localStorage.removeItem("graphql_jwt");
    },
    RotateTokens: (state, action) => {
      state.rest_auth_token = action.payload.access_token;
      state.rest_refresh_token = action.payload.refresh_token;
      localStorage.setItem("rest_auth_token", action.payload.access_token);
      localStorage.setItem("rest_refresh_token", action.payload.refresh_token);
    },
    MakePartner: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

export const RefrehsAccessToken = () => async (dispatch, getState) => {
  const refresh_token = getState().auth.rest_refresh_token;
  try {
    const response = await axios.post(`${BaseEndUrl}accounts/refresh_token/`, {
      refresh_token: refresh_token,
    });
    dispatch(AuthSlice.actions.RotateTokens(response.data));
  } catch (error) {
    throw error;
  }
};

export const { login, logout, MakePartner } = AuthSlice.actions;
export const isAuthenticated = (state) => state.auth.is_auth;
export const restAuthToken = (state) => state.auth.rest_auth_token;
export const restRefreshToken = (state) => state.auth.rest_refresh_token;
export const graphAuthToken = (state) => state.auth.graphql_jwt;
export const user = (state) => state.auth.user;
export default AuthSlice.reducer;
