import styles from "./QuizzesMain.module.css";
import clsx from "clsx";
import { filters, filtersMobile } from "../../assets/data/FiltersData";
import { RecommendedQuizCard } from "./RecommendedQuizCard";
// import { availableQuizzes } from "../../assets/data/availableQuizData";
import { useContext } from "react";
import { QuizzesContext } from "./QuizzesContext";
import { WindowSizeContext } from "../../Main_App/components/WindowSizeContext";
import { useNavigate } from "react-router-dom";
// import { shuffleArray } from "../../assets/reuseable functions/shuffleArray";

function QuizzesMain() {
  const { state } = useContext(QuizzesContext);
  const { windowWidth } = useContext(WindowSizeContext);

  const mobileView = windowWidth <= 500;
  // console.log(state);

  const quizCardCustomStyles = {
    height: `${mobileView ? "357px" : "337px"}`,
  };
  const quizCardTitleStyles = { fontSize: "18px", fontWeight: "600" };
  const quizCardImageStyles = { flex: "0.4" };

  return (
    <>
      {mobileView && (
        <div className={styles.topBar}>
          <div className={styles.topBarSearch}>
            <svg
              fill="currentColor"
              height="20px"
              width="20px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 231 231"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              enable-background="new 0 0 231 231"
              transform="rotate(-45)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="m198.021,82.5c0-45.563-36.853-82.5-82.417-82.5s-82.625,36.937-82.625,82.5c0,39.734 28.375,72.9 65.375,80.738v67.762h33v-67.564c38-7.452 66.667-40.848 66.667-80.936zm-82.334,49.5c-27.294,0-49.5-22.206-49.5-49.5s22.206-49.5 49.5-49.5 49.5,22.206 49.5,49.5-22.206,49.5-49.5,49.5z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <input placeholder="Search quizzes..." type="text" />
          </div>
          <div className={styles.topBarFilter}>
            <div className={styles.filterContainer}>
              {filtersMobile.map((item) => (
                <FilterItem key={item.name} text={item.name} />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={styles.quizzesMain}>
        <div className={styles.subMain}>
          <div className={styles.subMainLeft}>
            <h3>Filters</h3>
            <p className={clsx(styles.searchTitle)}>Search</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input type="text" placeholder="Search for quizzes..." />
            {filters.map((filterType) => (
              <FilterTypeBox
                key={filterType.title}
                title={filterType.title}
                filterContent={filterType.filterContent}
              />
            ))}
            {/* <FilterTypeBox /> */}
          </div>
          <div className={styles.subMainRight}>
            <h4>Available Quizzes</h4>
            <div className={styles.selectedFiltersContainer}>
              <SelectedFilter />
              <SelectedFilter />
            </div>
            <div className={styles.availableQuizContainer}>
              {!mobileView &&
                state.quizzes.map((quiz, index) => (
                  <RecommendedQuizCard
                    quizCardImageStyles={quizCardImageStyles}
                    quizCardTitleStyles={quizCardTitleStyles}
                    quizCardCustomStyles={quizCardCustomStyles}
                    key={index}
                    quiz={quiz}
                    questions={quiz.questions}
                    image={quiz.image}
                    title={quiz.title}
                    level={quiz.level}
                    time={quiz.time}
                    numbOfQuestions={quiz.numbOfQuestions}
                    rating={quiz.rating}
                    attempts={quiz.attempts}
                    id={quiz.id}
                  />
                ))}
              {mobileView &&
                state.quizzes.map((quiz, index) => (
                  <AvailableQuizCard
                    key={index}
                    quiz={quiz}
                    questions={quiz.questions}
                    image={quiz.image}
                    title={quiz.title}
                    level={quiz.level}
                    time={quiz.time}
                    numbOfQuestions={quiz.numbOfQuestions}
                    rating={quiz.rating}
                    attempts={quiz.attempts}
                    id={quiz.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AvailableQuizCard({
  image,
  title,
  time,
  level,
  numbOfQuestions,
  rating,
  attempts,
  quiz,
  id,
}) {
  const navigate = useNavigate();
  const handleStartQuiz = (id) => {
    navigate(`/quizhub/quizzes/${id}`, { state: quiz });
    // console.log(data);
  };

  return (
    <div className={styles.availableCard}>
      <div className={styles.availableCardTop}>
        <img src={image} alt="quizImage" />
      </div>
      <div className={styles.availableCardBottom}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <h4>{title}</h4>
          </div>
          <div className={styles.cardHeaderRight}>
            <p>{level}</p>
          </div>
        </div>
        <div className={styles.cardTime}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#374151"
          >
            <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
          </svg>
          <p className={clsx(styles.quizTime)}>{time} mins</p>
          <span></span>
          <p className={clsx(styles.quizQuestions)}>
            {numbOfQuestions} questions
          </p>
        </div>
        <div className={styles.cardRating}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#eac452"
          >
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
          </svg>
          <p className={clsx(styles.quizRating)}>{rating} (124)</p>
          <p className={clsx(styles.quizAttempts)}>{attempts} attempts</p>
        </div>
        <div className={styles.cardButton}>
          <button onClick={() => handleStartQuiz(id)}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}

function FilterItem({ text }) {
  return (
    <div className={styles.filterItem}>
      <p>{text}</p>
    </div>
  );
}

function SelectedFilter() {
  return (
    <div
      style={{
        padding: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        borderRadius: "14px",
        color: "#2855BE",
        backgroundColor: "#DBEAFE",
      }}
      className={styles.selectedFilter}
    >
      <p style={{ fontSize: "13px" }}>Mathematics</p>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </span>
    </div>
  );
}

function FilterTypeBox({ title, filterContent }) {
  // console.log(filterContent);
  return (
    <div className={styles.filterTypeBox}>
      <h4>{title}</h4>
      <div className={styles.filterList}>
        {filterContent.map((filter) => (
          <label key={filter.name}>
            <input type="checkbox" name={filter.name} value={filter.name} />
            <div className={clsx(styles.filterItemText)}>{filter.name}</div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuizzesMain;
