import clsx from "clsx";
// import dataScience from "../../assets/images/dataScience.jpg";
import styles from "./QuizHubMain.module.css";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
import { WindowSizeContext } from "../../Main_App/components/WindowSizeContext";

export function RecommendedQuizCard({
  quizCardImageStyles,
  quizCardTitleStyles,
  quizCardCustomStyles,
  levelStyles,
  title,
  image,
  quiz,
  time,
  numbOfQuestions,
  level,
  rating,
  attempts,
  id,
}) {
  // const { windowWidth } = useContext(WindowSizeContext);
  // const mobileView = windowWidth <= 500;
  const navigate = useNavigate();
  const handleStartQuiz = (id) => {
    navigate(`/quizhub/quizzes/${id}`, { state: quiz });
    // console.log(data);
  };
  return (
    <div style={quizCardCustomStyles} className={styles.recommendedQuizCard}>
      <div
        style={quizCardImageStyles}
        className={styles.recommendedQuizCardTop}
      >
        <img src={image} alt="Recommended Quiz" />
      </div>
      <div className={styles.recommendedQuizCardBottom}>
        <div className={styles.recommendedCardHeader}>
          <h4
            style={quizCardTitleStyles}
            className={clsx(styles.recommendedCourseTitle)}
          >
            {title}
          </h4>
          <p
            style={levelStyles}
            className={clsx(styles.recommendedCourseLevel)}
          >
            {level}
          </p>
        </div>
        <div className={styles.recommendedCardDescription}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
          </svg>
          <p className={clsx(styles.recommendedCourseTime)}>{time} mins</p>
          <span></span>
          <p className={clsx(styles.recommendedCourseQuestions)}>
            {numbOfQuestions} questions
          </p>
        </div>
        {/* {!mobileView && ( */}
        <div className={styles.recommendedQuizCardRating}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#eac452"
          >
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
          </svg>
          <p className={clsx(styles.rating)}>{rating} (124)</p>
          <p className={clsx(styles.attempts)}>{attempts} attempts</p>
        </div>
        {/* )} */}
        <button
          onClick={() => handleStartQuiz(id)}
          className={clsx(styles.recommendedQuizButton)}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
