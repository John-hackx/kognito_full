import styles from "./MobileSideBar.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import progileImage from "/images/profile-pic.jpg";
import { categories } from "../../assets/data/categoryDataMobile";
import { NavLink, useLocation } from "react-router-dom";

function MobileSideBar({ sidebarRef, setIsMenuOpen }) {
  const [windowHeight, setWindowHeight] = useState(() => window.innerHeight);
  const location = useLocation();
  const pathname = location.pathname;

  console.log(pathname);

  const closeSidebarMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(function () {
    const windowHeight = window.innerHeight;
    setWindowHeight(windowHeight);
  }, []);
  return (
    <div
      ref={sidebarRef}
      style={{ height: `${windowHeight}px` }}
      className={styles.mobileSideBar}
    >
      <div className={styles.sidebarTop}>
        <div className={styles.sidebarTopLeft}>
          <div className={clsx(styles.profilePicContainer)}>
            <img src={progileImage} alt="profile" />
          </div>
        </div>
        <div className={styles.sidebarTopRight}>
          <h4>Emily Johnson</h4>
          <p>Premium Student</p>
        </div>
      </div>
      <div className={styles.sidebarMiddle}>
        {categories.map((item) => (
          <SideBarItem
            closeSidebarMenu={closeSidebarMenu}
            pathname={pathname}
            key={item.text}
            svg={item.svg}
            text={item.text}
            link={item.link}
          />
        ))}
      </div>
      <div className={styles.sidebarBottom}>
        <div className={styles.upgrade}>
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.96562 10.5857L5.73125 8.00714L3.71875 6.33333H6.2125L7 3.8L7.7875 6.33333H10.2812L8.24687 8.00714L9.0125 10.5857L7 8.97976L4.96562 10.5857ZM1.75 19V12.0107C1.19583 11.3774 0.765625 10.6536 0.459375 9.83929C0.153125 9.025 0 8.15794 0 7.2381C0 5.21746 0.678125 3.50595 2.03437 2.10357C3.39062 0.70119 5.04583 0 7 0C8.95417 0 10.6094 0.70119 11.9656 2.10357C13.3219 3.50595 14 5.21746 14 7.2381C14 8.15794 13.8469 9.025 13.5406 9.83929C13.2344 10.6536 12.8042 11.3774 12.25 12.0107V19L7 17.1905L1.75 19ZM7 12.6667C8.45833 12.6667 9.69792 12.1389 10.7188 11.0833C11.7396 10.0278 12.25 8.74603 12.25 7.2381C12.25 5.73016 11.7396 4.44841 10.7188 3.39286C9.69792 2.3373 8.45833 1.80952 7 1.80952C5.54167 1.80952 4.30208 2.3373 3.28125 3.39286C2.26042 4.44841 1.75 5.73016 1.75 7.2381C1.75 8.74603 2.26042 10.0278 3.28125 11.0833C4.30208 12.1389 5.54167 12.6667 7 12.6667ZM3.5 16.3083L7 15.381L10.5 16.3083V13.5036C9.98958 13.8052 9.43906 14.0427 8.84844 14.2161C8.25781 14.3895 7.64167 14.4762 7 14.4762C6.35833 14.4762 5.74219 14.3895 5.15156 14.2161C4.56094 14.0427 4.01042 13.8052 3.5 13.5036V16.3083Z"
              fill="currentColor"
            />
          </svg>
          <p>Upgrade plan</p>
        </div>
        <div className={styles.logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9196a0"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z" />
          </svg>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

function SideBarItem({ closeSidebarMenu, pathname, svg, text, link }) {
  console.log(link);

  return (
    <div
      onClick={closeSidebarMenu}
      className={clsx(styles.sidebarItem, pathname === link && styles.active)}
    >
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        {svg}
        <p>{text}</p>
      </NavLink>
    </div>
  );
}

export default MobileSideBar;
