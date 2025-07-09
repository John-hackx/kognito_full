import React from "react";
import styles from "./AdminDashboard.module.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NavHeader from "./components/NavHeader";

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
          <div className={styles.navHeaderContainer}>
            <NavHeader />
          </div>
          <div className={styles.stats}>
            <div className={styles.statsCardsContainer}>
              <StatsCard />
              <StatsCard />
              <StatsCard />
              <StatsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard() {
  return (
    <div className={styles.statsCard}>
      <div className={styles.cardTop}>
        <p className={styles.cardTitle}>Total Students</p>
        <p className={styles.cardDays}>07 Days</p>
      </div>
      <div className={styles.cardMiddle}>
        <h3 className={styles.cardValue}>2400</h3>
        <div className={styles.cardSvg}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20V7.825L5.4 13.425L4 12L12 4L20 12L18.6 13.425L13 7.825V20H11Z"
              fill="#51BD9C"
            />
          </svg>
        </div>
      </div>
      <div className={styles.cardBottom}>
        <p className={styles.cardPercentage}>13%</p>
        <p className={styles.cardTarget}>Above Target</p>
      </div>
    </div>
  );
}
