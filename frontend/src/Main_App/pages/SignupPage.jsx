import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import googleIcon from "../../assets/images/google.png";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import linkedinIcon from "../../assets/images/linkedin.png";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import Loader from "../components/Loader";

function SignupPage() {
  //state to handle input fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //zustand useAuthStore
  const { isLoading, signUp, error, setError } = useAuthStore();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        navigate("/app");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  return (
    <>
      {!isLoading ? (
        <div className={styles.signup}>
          <div className={styles.signupTitle}>
            <h1>Create Account</h1>
          </div>
          {error ? (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.nameInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#acacac"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleOnChange}
                value={formData.firstName}
                required
                placeholder="First name"
              />
            </div>
            <div className={styles.nameInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#acacac"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleOnChange}
                value={formData.lastName}
                required
                placeholder="Last name"
              />
            </div>

            <div className={styles.emailInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#acacac"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleOnChange}
                value={formData.email}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.passwordInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#acacac"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
              </svg>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleOnChange}
                value={formData.password}
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                backgroundColor: isLoading && !error ? "gray" : "",
              }}
              disabled={isLoading}
              type="submit"
              onClick={handleSubmit}
              className={styles.signupButton}
            >
              {isLoading && !error ? "Signing up" : "Sign up"}
            </button>

            <div className={styles.orSeparator}>
              <span>or join with</span>
            </div>
            <div className={styles.socialLogin}>
              <div className={styles.socialIcon}>
                <img src={googleIcon} alt="Google" />
              </div>
              <div className={styles.socialIcon}>
                <img src={facebookIcon} alt="Facebook" />
              </div>
              <div className={styles.socialIcon}>
                <img src={twitterIcon} alt="Twitter" />
              </div>
              <div className={styles.socialIcon}>
                <img src={linkedinIcon} alt="LinkedIn" />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Loader isLoading={isLoading} />
      )}
    </>
  );
}

export default SignupPage;
