import axios from "axios";

const GITHUB_API_URL = "https://api.github.com"; // Константа для базового URL GitHub API

// Экземпляр axios для работы с GitHub API
export const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
});

// Endpoints для GitHub API
export enum ApiEndpointsGitHub {
  SearchRepos = "/search/repositories", // Endpoint для поиска репозиториев
}
