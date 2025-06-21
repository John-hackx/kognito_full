import { useEffect, useState } from "react";
import styles from "./AuthContainer.module.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import vectorImage1 from "../../assets/images/review-icon.svg";
import vectorImage2 from "../../assets/images/vectorImage1.svg";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function AuthContainer() {
  const { user } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.isLogin === true) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location.state?.isLogin]);

  console.log(user);

  return (
    <div className={styles.authPage}>
      <div className={styles.authPageContainer}>
        <div className={clsx(styles.authPageLeft)}>
          <div
            className={clsx(
              isLogin ? styles.leftContainer : styles.rightContainer,
              isLogin ? styles.isSignInSection : styles.isSignUpSection
            )}
          >
            {isLogin ? (
              <SignupPanel setIsLogin={setIsLogin} />
            ) : (
              <SignupPage setIsLogin={setIsLogin} />
            )}
            {isLogin && (
              <div className={styles.vectorImage1}>
                <img src={vectorImage1} alt="shit" />
              </div>
            )}
          </div>
        </div>
        <div className={clsx(styles.authPageRight)}>
          <div
            className={clsx(
              isLogin ? styles.rightContainer : styles.leftContainer,
              isLogin ? styles.isSignInSection : styles.isSignUpSection
            )}
          >
            {isLogin ? <LoginPage /> : <SigninPanel setIsLogin={setIsLogin} />}
            {!isLogin && (
              <div className={styles.vectorImage2}>
                <img src={vectorImage2} alt="shit" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignupPanel({ setIsLogin }) {
  return (
    <div className={styles.signupPanel}>
      <h2>First Time?</h2>
      <p>Join us to access exclusive content and features.</p>
      <button className={styles.signupButton} onClick={() => setIsLogin(false)}>
        Sign Up
      </button>
    </div>
  );
}

function SigninPanel({ setIsLogin }) {
  return (
    <div className={styles.signupPanel}>
      <h2>Already have an account?</h2>
      <p>Log in to access your account.</p>
      <button className={styles.signupButton} onClick={() => setIsLogin(true)}>
        Sign In
      </button>
    </div>
  );
}

export default AuthContainer;
