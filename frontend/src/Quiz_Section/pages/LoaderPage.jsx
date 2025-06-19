import { useContext, useEffect, useState } from "react";
import styles from "./LoaderPage.module.css";
import { QuizzesContext } from "../components/QuizzesContext";
import { useLocation } from "react-router-dom";

function LoaderPage() {
  const [loadCount, setLoadCount] = useState(6);
  const { dispatch } = useContext(QuizzesContext);
  const location = useLocation();

  useEffect(
    function () {
      const id = setInterval(() => {
        if (loadCount === 0) {
          dispatch({ type: "start", payload: location.state });
        }
        setLoadCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch, loadCount, location.state]
  );

  console.log(loadCount);

  return (
    <div className={styles.loaderPage}>
      <h2>Quiz Starting in:</h2>
      <h3>{loadCount}</h3>
    </div>
  );
}

export default LoaderPage;
