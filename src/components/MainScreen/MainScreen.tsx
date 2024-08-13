"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import { RootState } from "@/redux/store";
import RepoTable from "@/components/RepoTable/RepoTable";
import RepoDetails from "@/components/RepoDetails/RepoDetails";

import { Repo } from "@/redux/features/repositories/reposTypes";

import styles from "./mainScreen.module.scss";

// Главный компонент экрана, отображающий таблицу репозиториев и детали выбранного репозитория.
const MainScreen: React.FC = () => {
  // Состояние для хранения выбранного репозитория
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  // Состояние для определения статуса загрузки данных из Redux
  const { status } = useSelector((state: RootState) => state.repos);

  // Состояние для определения первого состояния загрузки экрана
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    // Установка состояния первой загрузки как false после монтирования компонента
    setFirstLoading(false);
  }, []);

  return (
    <>
      {status === "idle" && !firstLoading ? (
        <div className={styles.sectionWelcome}>Добро пожаловать</div>
      ) : !firstLoading ? (
        <div className={styles.main}>
          <RepoTable
            onSelectRepo={setSelectedRepo}
            selectedRepo={selectedRepo}
          />
          <RepoDetails selectedRepo={selectedRepo} />
        </div>
      ) : (
        <div className={styles.sectionWelcome}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MainScreen;
