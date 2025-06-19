import clsx from "clsx";
import styles from "./CourseProgressCard.module.css";
// import { useContext } from "react"
// import { WindowSizeContext } from "./WindowSizeContext"

export default function CourseProgressCard({
  level,
  topRightPtext,
  BtnText,
  children,
  lessonsCompleteStyles,
  progressTextStyles,
  barStyles,
  topRightStyles,
  courseName,
  instructor,
  image,
  progress,
}) {
  // const {windowWidth} = useContext(WindowSizeContext)
  // const mobileView = windowWidth <= 500;
  const progressBarStyles = {
    width: `${progress}%`,
    maximumWidth: `${progress}%`,
  };

  return (
    <div className={clsx(styles.progressCard)}>
      <div className={styles.progressTop}>
        <div className={clsx(styles.progressTopLeft)}>
          <div className={styles.progressImage}>
            <img src={image} alt="Course" />
          </div>
        </div>
        <div style={topRightStyles} className={clsx(styles.progressTopRight)}>
          <h4>{courseName}</h4>
          <p>
            {topRightPtext}: {instructor || level}
          </p>
          <div style={barStyles} className={clsx(styles.progressBars)}>
            <span className={clsx(styles.emptyProgressBar)}></span>
            <span
              style={progressBarStyles}
              className={clsx(styles.filledProgressBar)}
            ></span>
          </div>
          <p style={progressTextStyles} className={clsx(styles.progressText)}>
            {progress}%
          </p>
        </div>
      </div>
      <div className={styles.progressBottom}>
        <p style={lessonsCompleteStyles}>{children}</p>
        <button>{BtnText}</button>
      </div>
    </div>
  );
}
