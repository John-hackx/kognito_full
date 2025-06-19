import styles from "./ProgressBar.module.css";
import clsx from "clsx";

function ProgressBar({
  emptyProgressBarStyles,
  progressTextStyles,
  progressBarContainerStyles,
  progressBarStyles,
  progress,
}) {
  return (
    <div
      style={progressBarContainerStyles}
      className={clsx(styles.progressBarContainer)}
    >
      <div style={progressBarStyles} className={clsx(styles.progressBar)}>
        <span
          style={emptyProgressBarStyles}
          className={clsx(styles.emptyProgressBar)}
        ></span>
        <span
          style={{ width: progress, maxWidth: progress }}
          className={clsx(styles.filledProgressBar)}
        ></span>
      </div>
      <p style={progressTextStyles} className={clsx(styles.progressBarText)}>
        79%
      </p>
    </div>
  );
}

export default ProgressBar;
