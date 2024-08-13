import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

import Star from "@/assets/images/Star.svg";

import { RepoDetailsProps } from "./RepoDetails.types";

import styles from "./RepoDetails.module.scss";

// Детальная информация выбранного репозитория
const RepoDetails: React.FC<RepoDetailsProps> = ({ selectedRepo }) => {
  if (!selectedRepo)
    return <Box className={styles.asideEmpty}>Выберите репозиторий</Box>;

  return (
    <Box className={styles.aside}>
      <h2 className={styles.name}>{selectedRepo.name}</h2>
      <div className={styles.info}>
        {selectedRepo.language ? (
          <span className={styles.language}>{selectedRepo.language}</span>
        ) : (
          <div className={styles.language}>N/A</div>
        )}

        <div className={styles.stars}>
          <Image src={Star} alt="Stars" />
          {selectedRepo.stargazers_count}
        </div>
      </div>
      {selectedRepo.topics.length > 0 && (
        <div className={styles.topics}>
          {selectedRepo.topics.map((item) => (
            <div key={item} className={styles.topic}>
              {item}
            </div>
          ))}
        </div>
      )}
      {selectedRepo.license && (
        <div className={styles.license}>
          {selectedRepo.license?.name || "N/A"}
        </div>
      )}
    </Box>
  );
};

export default RepoDetails;
