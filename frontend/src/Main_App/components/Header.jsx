import styles from "./Header.module.css";
import clsx from "clsx";
import logo from "../../assets/images/logo.png";
import profileImage from "../../assets/images/profile-pic.jpg";
import { useContext, useEffect, useRef } from "react";
import { WindowSizeContext } from "./WindowSizeContext";
import { DashboardContext } from "./DashboardContext";

function Header({
  quizIsActive,
  setIsMenuOpen,
  children,
  logoStyle,
  middleChildrenStyle,
}) {
  const { windowWidth } = useContext(WindowSizeContext);
  // const { dashboardDispatch } = useContext(DashboardContext);
  const menuIconRef = useRef(null);

  const mobileView = windowWidth <= 500;
  // const handleMenu = () => {
  //   dispatch({ type: "openMenu" });
  // };

  useEffect(
    function () {
      const handleMenuOpen = (e) => {
        if (menuIconRef.current && menuIconRef.current === e.target)
          !quizIsActive
            ? setIsMenuOpen(true)
            : alert("Not Allowed!! Quiz is ongoing!!");
        // dashboardDispatch({ type: "openMenu" });
      };
      document.addEventListener("click", handleMenuOpen);
      return () => document.removeEventListener("click", handleMenuOpen);
    },
    [setIsMenuOpen, quizIsActive]
  );

  return (
    <div className={clsx(styles.navbar)}>
      {mobileView && (
        <div className={clsx(styles.menuIcon)}>
          <svg
            ref={menuIconRef}
            // onClick={handleMenu}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
      )}
      <div style={logoStyle} className={clsx(styles.logo)}>
        <img src={logo} alt="Logo" />
      </div>
      <div style={middleChildrenStyle} className={clsx(styles.middleChildren)}>
        {children}
      </div>
      <div className={clsx(styles.accountInfo)}>
        <div className={clsx(styles.bell)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
          <span>3</span>
        </div>
        <div className={clsx(styles.profileImage)}>
          <img src={profileImage} alt="Profile" />
        </div>
        <div className={clsx(styles.profileText)}>
          <h4>Emily Johnson</h4>
          <p>Premium Student</p>
        </div>
        <div className={clsx(styles.profileHealth)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M480-320q59 0 127.5-20.5T797-414q2-11 2.5-21.5t.5-21.5q0-11-8.5-18t-19.5-4q-14 5-31 10.5T698-452q-69 29-118 40.5T480-400q-52 0-102-12t-122-41q-26-11-40-16l-28-10q-11-4-19.5 3.5T160-457q0 11 .5 21.5T163-414q101 48 179.5 71T480-320Zm0 160q94 0 167-41t114-110q-88 37-155 54t-126 17q-58 0-129-17.5T198-310q40 69 113.5 109.5T480-160Zm0-400q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-720q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720q0 33 23.5 56.5T480-640Zm0 560q-177 0-288.5-105T80-457q0-52 41.5-83t90.5-15q16 5 33.5 11.5T287-527q64 26 106 36.5t87 10.5q43 0 85-10t103-36q29-11 46.5-18t34.5-12q49-14 90 17t41 82q0 79-31 147.5T764-190q-54 51-127 80.5T480-80Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Header;
