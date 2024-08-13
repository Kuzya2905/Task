"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { searchRepos } from "@/redux/features/repositories/reposThunks";
import { AppDispatch } from "@/redux/store";
import {
  setCurrentPage,
  setSearchQuery,
} from "@/redux/features/repositories/reposSlice";

import styles from "./header.module.scss";

// Компонент Header c поиском репозиториев.
const Header: React.FC = () => {
  // Состояние для хранения поискового запроса
  const [query, setQuery] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Получение сохраненных данных из localStorage при монтировании компонента.
    // В данном приложении используется LocalStorage для сохранения данных страницы и возможностью перезагружать её без потери данных.
    const savedQuery = localStorage.getItem("searchQuery");
    const savedPage = Number(localStorage.getItem("page"));
    const savedPerPage = Number(localStorage.getItem("perPage")) || 10;
    const savedOrder = localStorage.getItem("order");
    const savedSort = localStorage.getItem("sort");

    if (savedQuery) {
      setQuery(savedQuery);

      dispatch(setCurrentPage(1));

      // Поиск репозиториев по сохраненным параметрам из LocalStorage
      dispatch(
        searchRepos({
          query: savedQuery,
          perPage: savedPerPage,
          page: savedPage,
          sort: savedSort,
          order: savedOrder,
        })
      );

      dispatch(setSearchQuery(savedQuery));
    }
  }, [dispatch]);

  //Обработчик нажатия кнопки поиска.
  const handleSearch = () => {
    const savedPerPage = Number(localStorage.getItem("perPage")) || 10;
    // Установка текущей страницы как 1
    dispatch(setCurrentPage(1));

    // Поиск репозиториев с введенным запросом параметров
    dispatch(searchRepos({ query, perPage: savedPerPage, page: 1 }));

    // Установка запроса поиска в состояние Redux
    dispatch(setSearchQuery(query));

    // Сохранение запроса в localStorage
    localStorage.setItem("searchQuery", query);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.blockSearch}>
        <TextField
          value={query}
          variant="outlined"
          placeholder="Введите поисковый запрос"
          onChange={(e) => setQuery(e.target.value)}
          fullWidth={true}
          className={styles.field}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              padding: "9.5px 16px",
              background: "#f2f2f2",
              borderRadius: "4px",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "171%",
              letterSpacing: "0.01em",
              color: "#000000",
            },
            "& .MuiInputBase-input::placeholder": {
              fontStyle: "italic",
              fontWeight: 400,
              color: "#828282",
            },
          }}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            padding: "8px 22px",
            background: "#2196f3",
          }}
        >
          Искать
        </Button>
      </div>
    </div>
  );
};

export default Header;
