import { Repo } from "@/redux/features/repositories/reposTypes";

export interface RepoTableProps {
  onSelectRepo: (repo: Repo) => void; // Функция для изменения стейта выбранного репозитория 
  selectedRepo: Repo | null; // Выбранный репозиторий 
}
