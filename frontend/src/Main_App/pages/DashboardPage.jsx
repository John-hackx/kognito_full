// import { Link } from "react-router-dom";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import styles from "./DashboardPage.module.css";
import clsx from "clsx";
import { WindowSizeContext } from "../components/WindowSizeContext";
import MobileFooter from "../components/MobileFooter";
import MobileSideBar from "../components/MobileSideBar";
import { DashboardContext } from "../components/DashboardContext";

const initialState = {
  isMenuOpen: false,
};

const reducer = (dashboardState, action) => {
  switch (action.type) {
    case "openMenu":
      // console.log("opened");

      return {
        ...dashboardState,
        isMenuOpen: true,
      };
    case "closeMenu":
      // console.log("closed");

      return {
        ...dashboardState,
        isMenuOpen: dashboardState.isMenuOpen ? false : "",
      };
    default:
      throw new Error("unknown action dispatched");
  }
};

function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { windowWidth } = useContext(WindowSizeContext);
  const [dashboardState, dashboardDispatch] = useReducer(reducer, initialState);
  const sidebarRef = useRef(null);
  const mobileView = windowWidth <= 500;
  // useEffect(
  //   function () {
  //     alert(window.innerHeight);
  //   },
  //   [windowWidth]
  // );

  useEffect(
    function () {
      const clickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
          setIsMenuOpen(false);
          // dashboardDispatch({ type: "closeMenu" });
        }
      };
      document.addEventListener("click", clickOutside);

      return () => document.removeEventListener("click", clickOutside);
    },
    [isMenuOpen]
  );

  const logoStyle = {
    borderRight: "0.8px solid #d9d9d9",
    borderBottom: "none!important",
  };
  // const footerStyles = { marginTop: "-100px" };
  return (
    <>
      <DashboardContext.Provider value={{ dashboardState, dashboardDispatch }}>
        {isMenuOpen && <MobileSideBar sidebarRef={sidebarRef} />}
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          logoStyle={logoStyle}
        >
          {!mobileView && (
            <>
              <div className={clsx(styles.activeStudents)}>
                <span></span>
                <p className={clsx(styles.activeText)}>Active Students</p>
                <div className={clsx(styles.activeNumber)}>
                  <p>23</p>
                </div>
              </div>
              <div className={clsx(styles.searchBar)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for courses, topics, instructors..."
                />
              </div>
            </>
          )}
        </Header>
        <Main isMenuOpen={isMenuOpen} />
        {!mobileView ? <Footer /> : <MobileFooter />}
      </DashboardContext.Provider>
    </>
  );
}

export default DashboardPage;
