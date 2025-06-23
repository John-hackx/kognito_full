import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.loadingDotsContainer}>
      <div className={styles.loadingDots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default Loader;
