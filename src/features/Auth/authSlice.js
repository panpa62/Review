import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api.js";

//create auth api and the slice here
//inject the auth api (endpoints) with the main api

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      querry: (user) => ({
        url: "/users/register",
        method: "POST",
        body: { user },
      }),
      transformResponse: (response) => response.data,
    }),

    login: builder.mutation({
      querry: (user) => ({
        url: "/users/login",
        method: "POST",
        body: { user },
      }),
      transformResponse: (response) => response.data,
    }),
    getUserProfile: builder.query({
      query: () => "/users/me",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserProfileQuery } =
  authApi;

const TOKEN_KEY = "token";
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  localStorage.setItem(TOKEN_KEY, payload.token);
};

//slice goes here

//to create slice, we need a name, initial state(value),reducers
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    //logout here nothing to do with api,
    //just remove the auth/token from the storage
    logout: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  //these extra reducers automatically update the token when
  //the RTK querry is fulfilled.
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem(TOKEN_KEY, payload.token);
      }
    );
    builder.addMatcher(
      api.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem(TOKEN_KEY, payload.token);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
