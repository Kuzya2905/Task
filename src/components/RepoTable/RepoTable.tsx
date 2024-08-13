import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  TableSortLabel,
  Box,
} from "@mui/material";

import { AppDispatch, RootState } from "@/redux/store";
import { searchRepos } from "@/redux/features/repositories/reposThunks";
import { setCurrentPage } from "@/redux/features/repositories/reposSlice";

import { Repo } from "@/redux/features/repositories/reposTypes";
import { RepoTableProps } from "./RepoTable.types";

import styles from "./RepoTable.module.scss";

// Компонент для отображения таблицы с репозиториями.
const RepoTable: React.FC<RepoTableProps> = ({
  onSelectRepo,
  selectedRepo,
}) => {
  const { repos, totalCount, currentPage, searchQuery, status, error } =
    useSelector((state: RootState) => state.repos);

  // Инициализация переменных для хранения направления сортировки и текущего поля сортировки
  const sortDirection = useRef<"asc" | "desc">(
    (localStorage.getItem("order") as "asc" | "desc") || ""
  );
  const sortBy = useRef<string>(localStorage.getItem("sort") || "");

  // Переменная для хранения количества строк на странице
  const rowsPerPage = useRef(Number(localStorage.getItem("perPage") || 10));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("page")) {
      dispatch(setCurrentPage(Number(localStorage.getItem("page"))));
    }
  }, [dispatch]);

  /**
   * Обработчик сортировки таблицы.
   * @param field - Поле, по которому будет производиться сортировка.
   */
  const handleSort = (field: string) => {
    // Установка текущей страницы как 1
    dispatch(setCurrentPage(1));
    localStorage.setItem("page", String(1));

    // Прерывание выполнения обработчика сортировки при загрузке данных
    if (status === "loading") return;

    sortDirection.current =
      sortDirection.current === "asc" && sortBy.current === field
        ? "desc"
        : sortDirection.current === "desc" && sortBy.current !== field
        ? "desc"
        : "asc";

    sortBy.current = field;

    dispatch(
      searchRepos({
        query: searchQuery,
        perPage: rowsPerPage.current,
        page: 1,
        sort: sortBy.current,
        order: sortDirection.current,
      })
    );

    localStorage.setItem("order", sortDirection.current);
    localStorage.setItem("sort", sortBy.current);
  };

  /**
   * Обработчик изменения страницы в таблице.
   * @param event - Событие клика.
   * @param newPage - Номер новой страницы.
   */
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const nextPage = newPage + 1;

    dispatch(setCurrentPage(nextPage));
    dispatch(
      searchRepos({
        query: searchQuery,
        perPage: rowsPerPage.current,
        page: nextPage,
        sort: sortBy.current,
        order: sortDirection.current,
      })
    );

    localStorage.setItem("page", String(nextPage));
  };

  /**
   * Обработчик изменения количества строк на странице.
   * @param event - Событие изменения ввода.
   */
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    rowsPerPage.current = +event.target.value;

    dispatch(
      searchRepos({
        query: searchQuery,
        perPage: rowsPerPage.current,
        page: currentPage,
        sort: sortBy.current,
        order: sortDirection.current,
      })
    );

    localStorage.setItem("perPage", String(rowsPerPage.current));
  };

  return (
    <Box className={styles.wrapperTable}>
      <h1 className={styles.header}>Результаты поиска</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.cellHeadName}>Название</TableCell>
            <TableCell className={styles.cellHeadLanguage}>Язык</TableCell>
            <TableCell className={styles.cellHead}>
              <TableSortLabel
                active={sortBy.current === "forks"}
                direction={sortDirection.current}
                onClick={() => handleSort("forks")}
              >
                Число форков
              </TableSortLabel>
            </TableCell>
            <TableCell className={styles.cellHead}>
              <TableSortLabel
                active={sortBy.current === "stars"}
                direction={sortDirection.current}
                onClick={() => handleSort("stars")}
              >
                Число звезд
              </TableSortLabel>
            </TableCell>
            <TableCell className={styles.cellHead}>
              <TableSortLabel
                active={sortBy.current === "updated"}
                direction={sortDirection.current}
                onClick={() => handleSort("updated")}
              >
                Дата обновления
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status === "loading" ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : status === "succeeded" && totalCount !== 0 ? (
            repos.map((repo: Repo) => (
              <TableRow
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    background: "#f2f2f2",
                  },
                  background: selectedRepo?.id === repo?.id ? "#f2f2f2" : "",
                }}
                key={repo.id}
                onClick={() => {
                  onSelectRepo(repo);
                }}
              >
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.language || "N/A"}</TableCell>
                <TableCell>{repo.forks_count}</TableCell>
                <TableCell>{repo.stargazers_count}</TableCell>
                <TableCell>
                  {new Date(repo.updated_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                {status === "failed" ? error : "No repositories found."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {repos.length !== 0 && status === "succeeded" && (
        <TablePagination
          component="div"
          count={totalCount}
          page={currentPage - 1}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage.current}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiTablePagination-selectLabel": {
              color: "rgba(0, 0, 0, 0.6)",
            },
            "& .MuiButtonBase-root": {
              padding: "12px",
            },
            "& .MuiTablePagination-actions": {
              marginLeft: "26px",
            },
            "& .MuiInputBase-root": {
              marginRight: "26px",
            },
          }}
        />
      )}
    </Box>
  );
};

export default RepoTable;
