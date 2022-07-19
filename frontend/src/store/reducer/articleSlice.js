import {createSlice} from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "auth",
  initialState: () => {
    return {
      articleId: '',
    }
  },
  reducers: {
    setCurrentArticle (state, action) {
      state.articleId = action.payload.articleId
      // return action.payload;
    },
  },
});


export const {
  setCurrentArticle,
} = articleSlice.actions;