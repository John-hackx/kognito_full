import styles from "./Header.module.css";
import clsx from "clsx";
import logo from "../../assets/images/logo.png";
import profileImage from "../../assets/images/profile-pic.jpg";
import { useContext, useEffect, useRef } from "react";
import { WindowSizeContext } from "./WindowSizeContext";
import { DashboardContext } from "./DashboardContext";
import useAuthStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

function Header({
  quizIsActive,
  setIsMenuOpen,
  children,
  logoStyle,
  middleChildrenStyle,
}) {
  const { logOut, user } = useAuthStore();
  const { windowWidth } = useContext(WindowSizeContext);
  const navigate = useNavigate();
  // const { dashboardDispatch } = useContext(DashboardContext);
  const menuIconRef = useRef(null);

  const mobileView = windowWidth <= 500;
  // const handleMenu = () => {
  //   dispatch({ type: "openMenu" });
  // };

  const handleLogout = async () => {
    const res = await logOut();
    if (res.success === true) {
      navigate("/");
    }
  };
  console.log(user);
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
            onClick={handleLogout}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Header;
