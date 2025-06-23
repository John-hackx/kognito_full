import React, { useEffect } from "react";
import styles from "./TopLoadingBar.module.css";
const TopLoadingBar = ({ isLoading }) => {
  useEffect(() => {
    // Add/remove overflow hidden from body when loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.topLoadingBar}>
      <div className={styles.loadingBarProgress}></div>
    </div>
  );
};

export default TopLoadingBar;
