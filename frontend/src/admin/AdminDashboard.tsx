import React from "react";
import styles from "./AdminDashboard.module.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardLeft}>
          <Sidebar />
        </div>
        <div className={styles.dashboardRight}>
          <Header>
            <div className={styles.backSvg}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15L4 10L9 5L10.0625 6.0625L6.125 10L10.0625 13.9375L9 15ZM14.9375 15L9.9375 10L14.9375 5L16 6.0625L12.0625 10L16 13.9375L14.9375 15Z"
                  fill="black"
                />
              </svg>
            </div>
          </Header>
        </div>
      </div>
    </div>
  );
}
