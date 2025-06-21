import styles from "./LandingPageHeader.module.css";
import logo from "../../assets/images/logo2.jpg";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useContext, useState } from "react";
import { WindowSizeContext } from "./WindowSizeContext";

function LandingPageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { windowWidth } = useContext(WindowSizeContext);
  const navigate = useNavigate();
  const mobileView = windowWidth <= 500;

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={styles.navbarMiddle}>
        <div className={styles.linksContainer}>
          <ul>
            <li>
              <Link to="#home">Home</Link>
            </li>
            <li>
              <Link to="#home">About</Link>
            </li>
            <li>
              <Link to="#services">Services</Link>
            </li>
            <li>
              <Link to="#home">Courses</Link>
            </li>
            <li>
              <Link to="#home">Contact</Link>
            </li>
          </ul>
        </div>

        {mobileView && isMenuOpen && (
          <div className={styles.mobileLinksContainer}>
            <ul>
              <li>
                <Link to="#home">Home</Link>
              </li>
              <li>
                <Link to="#home">About</Link>
              </li>
              <li>
                <Link to="#home">Services</Link>
              </li>
              <li>
                <Link to="#home">Courses</Link>
              </li>
              <li>
                <Link to="#home">Contact</Link>
              </li>
            </ul>
            <div className={clsx(styles.navbarBtnsContainerMobile)}>
              <button
                onClick={() => navigate("auth", { state: { isLogin: true } })}
                className={clsx(styles.navbarSignInBtnSide)}
              >
                Log in
              </button>
              <button
                onClick={() => navigate("auth", { state: { isLogin: false } })}
                className={clsx(styles.navbarSignUpBtnSide)}
              >
                Sign up{" "}
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
                      fill="#27696e"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.navbarRight}>
        {mobileView && !isMenuOpen && (
          <svg
            onClick={handleOpenMenu}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        )}
        {mobileView && isMenuOpen && (
          <svg
            onClick={handleCloseMenu}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        )}
        <div className={clsx(styles.navbarBtnsContainer)}>
          <button
            onClick={() => navigate("auth", { state: { isLogin: true } })}
            className={clsx(styles.navbarSignInBtn)}
          >
            Log in
          </button>
          <button
            onClick={() => navigate("auth", { state: { isLogin: false } })}
            className={clsx(styles.navbarSignUpBtn)}
          >
            Get Started{" "}
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
                  fill="#27696e"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default LandingPageHeader;
