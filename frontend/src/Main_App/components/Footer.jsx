import styles from "./Footer.module.css";
import clsx from "clsx";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Footer({ footerStyles }) {
  return (
    <div style={footerStyles} className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopFirst}>
          <img className={clsx(styles.logo)} src={logo} alt="logo" />
          <p className={clsx(styles.description)}>
            Your ultimate learning companion for academic success.
          </p>
          <div className={styles.socialIcons}>
            <img src="https://img.icons8.com/ios/50/ffffff/facebook-new.png" />
            <img src="https://img.icons8.com/ios/50/ffffff/twitter.png" />
            <img src="https://img.icons8.com/ios/50/ffffff/instagram-new.png" />
            <img src="https://img.icons8.com/ios/50/ffffff/linkedin.png" />
          </div>
        </div>
        <div className={styles.footerTopSecond}>
          <h3>QuickLinks</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quizzes">Quizzes</Link>
            </li>
            <li>
              <Link to="/practices">Practices</Link>
            </li>
            <li>
              <Link to="/tutors">Tutors</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerTopThird}>
          <h3>Support</h3>
          <ul>
            <li>
              <Link to="/help">Help Center</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/policies">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms_conditions">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerTopFourth}>
          <h3>Subscribe</h3>
          <p>Stay updated with our latest quizzes and features.</p>
          <div className={clsx(styles.inputSection)}>
            <input type="text" placeholder="Your Email" id="email" />
            <button>Join In</button>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 Kognito. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
