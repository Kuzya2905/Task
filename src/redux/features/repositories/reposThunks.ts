import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiEndpointsGitHub, githubApi } from "@/api/githubApi";

// Создание асинхронного thunk для поиска репозиториев на GitHub
export const searchRepos = createAsyncThunk(
  "repos/searchRepos",
  async (
    {
      query,
      perPage,
      page,
      sort,
      order,
    }: {
      query: string; // Поисковый запрос
      perPage: number; // Количество результатов на страницу
      page: number; // Номер страницы для пагинации
      sort?: string | null; // Параметр сортировки (опционально)
      order?: string | null; // Направление сортировки (опционально)
    },
    thunkAPI
  ) => {
    try {
      // Выполнение запроса к GitHub API для поиска репозиториев
      const response = await githubApi.get(ApiEndpointsGitHub.SearchRepos, {
        params: {
          q: query,
          per_page: perPage,
          page: page,
          sort: sort,
          order: order,
        },
      });
      return {
        repos: response.data.items,
        totalCount: response.data.total_count,
        currentPage: page,
        sort: sort,
        order: order,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching repositories:",
          error.response?.data.message
        );
        return thunkAPI.rejectWithValue(
          error.response?.data.message || "Произошла ошибка при запросе данных"
        );
      } else {
        console.error("Unknown error:", error);
        return thunkAPI.rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);
