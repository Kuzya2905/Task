import { Repo } from "@/redux/features/repositories/reposTypes";

export interface RepoDetailsProps {
  selectedRepo: Repo | null; // Выбранный репозиторий
}
