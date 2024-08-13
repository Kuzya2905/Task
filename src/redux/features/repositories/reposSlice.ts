import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { searchRepos } from "./reposThunks";

import { ReposState } from "./reposTypes";

const initialState: ReposState = {
  repos: [],
  status: "idle",
  totalCount: 0,
  searchQuery: "",
  currentPage: 1,
  error: null,
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    // Обновление поискового запроса
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    // Обновление текущей страницы
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.repos = action.payload.repos;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(searchRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setCurrentPage } = reposSlice.actions;

export default reposSlice.reducer;
