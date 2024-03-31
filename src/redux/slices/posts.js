import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { act } from 'react-dom/test-utils';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

const initialState = {
  posts: {
    items: [],
    satus: 'loading',
  },
  tags: {
    items: [],
    satus: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.post.items = [];
      state.posts.satus = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.post.items = action.payload;
      state.posts.satus = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.satus = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
