import api from "../../store/api.js";
import { createSlice } from "@reduxjs/toolkit";

//injection
const postapi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const { useFetchPostsQuery } = postapi;

//create post slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPost: (state, action) => {
      return action.payload;
    },
  },
});

export default postSlice.reducer;
export const { setPost } = postSlice.actions;
