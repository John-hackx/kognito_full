import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavHeader.module.css";

export default function NavHeader() {
  return (
    <div className={styles.navHeader}>
      <div className={styles.navHeaderContainer}>
        <div className={styles.adminTitle}>
          <h2>Admin</h2>
        </div>
        <div className={styles.navigation}>
          <Link to="/admin/dashboard">Home</Link>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 17V7L15 12L10 17Z" fill="#434343" />
          </svg>
          <p>Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
}
