import axios from "axios";

const GITHUB_API_URL = "https://api.github.com"; // Константа для базового URL GitHub API
const GITHUB_API_TOKEN = "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"; // Личный токен GitHub

// Экземпляр axios для работы с GitHub API
export const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
  },
});

// Endpoints для GitHub API
export enum ApiEndpointsGitHub {
  SearchRepos = "/search/repositories", // Endpoint для поиска репозиториев
}
