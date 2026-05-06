import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPost: null,
  categories: [],
  error: null,
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
      state.error = null;
    },
    getPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id,
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updatePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
} = postSlice.actions;

export default postSlice.reducer;
