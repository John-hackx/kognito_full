import { useNavigate } from "react-router-dom";
import styles from "./QuizReviewPage.module.css";
import clsx from "clsx";
import { useContext } from "react";
import { WindowSizeContext } from "../../Main_App/components/WindowSizeContext";

function QuizReviewPage() {
  const { windowWidth } = useContext(WindowSizeContext);
  const navigate = useNavigate();

  const mobileView = windowWidth <= 500;

  const handleBackToDashboard = () => {
    navigate("/app/quizhub/home");
  };

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.headerLeft}>
          <svg
            onClick={handleBackToDashboard}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#434343"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <div className={clsx(styles.headerTitle)}>
            <h2>Quiz Review</h2>
            {!mobileView ? (
              <p>Basic Computing - 20 Questions</p>
            ) : (
              <p>Basic Computing</p>
            )}
          </div>
        </div>
        <div className={styles.headerRight}>
          {!mobileView && (
            <>
              <div className={clsx(styles.completed)}>
                <p>Completed</p>
              </div>
              <div className={styles.checkSvgContainer}>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0833 28.75L7 20.7083L9.125 18.5417L15.0833 24.5L28.625 11L30.75 13.125L15.0833 28.75Z"
                    fill="white"
                  />
                </svg>
              </div>
            </>
          )}
          <div className={styles.bookLive}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 14H14C14.2833 14 14.5208 13.9042 14.7125 13.7125C14.9042 13.5208 15 13.2833 15 13V11L17 13V7L15 9V7C15 6.71667 14.9042 6.47917 14.7125 6.2875C14.5208 6.09583 14.2833 6 14 6H8C7.71667 6 7.47917 6.09583 7.2875 6.2875C7.09583 6.47917 7 6.71667 7 7V13C7 13.2833 7.09583 13.5208 7.2875 13.7125C7.47917 13.9042 7.71667 14 8 14ZM2 22V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H6L2 22ZM5.15 16H20V4H4V17.125L5.15 16Z"
                fill="currentColor"
              />
            </svg>
            {!mobileView ? <p>Book a Live Session</p> : <p>Book Live</p>}
          </div>
        </div>
      </nav>
      <div className={styles.pageContainer}>
        <div className={styles.main}>
          <div className={styles.mainHeader}>
            <div className={styles.mainHeaderLeft}>
              <QuizStats title={"Score"} description={"90/120"} />
              {!mobileView && (
                <>
                  <QuizStats title={"Accuracy"} description={"80%"} />
                  <QuizStats title={"Time Spent"} description={"12:45"} />
                </>
              )}
            </div>
            <div className={styles.mainHeaderRight}>
              <CorrectIncorrect bgColor={"green"} text={"8 Correct"} />
              <CorrectIncorrect bgColor={"red"} text={"10 Incorrect"} />
            </div>
          </div>
          <div className={styles.mainBody}>
            <div className={styles.mainBodySub}>
              <div className={styles.questionsContainer}>
                <h5 className={clsx(styles.questionNumber)}>Question 1</h5>
                <p className={clsx(styles.questionText)}>
                  What is the primary function of Mitochodria?
                </p>
                <div className={styles.answersBox}>
                  <AnswerOption shitTemp={true} />
                  <AnswerOption />
                  <AnswerOption />
                  <AnswerOption />
                </div>
                <div className={styles.explanationContainer}>
                  <h4 className={clsx(styles.explanationTitle)}>Explanation</h4>
                  <div className={clsx(styles.explanationBody)}>
                    <p>
                      Mitochondria are often referred to as the "powerhouse of
                      the cell" because their primary function is to generate
                      energy in the form of ATP (adenosine triphosphate) through
                      cellular respiration. This process involves the breakdown
                      of glucose and other nutrients to release energy, which is
                      then stored in ATP molecules for the cell to use for
                      various functions.
                    </p>
                  </div>
                </div>
                <div className={styles.keyPointsSection}>
                  <h5 className={clsx(styles.keyPointsTitle)}>Key Points:</h5>
                  <div className={styles.keyPointsBody}>
                    <KeyPoint />
                    <KeyPoint />
                    <KeyPoint />
                    <KeyPoint />
                    <KeyPoint />
                  </div>
                </div>
                <div className={styles.incorrectOptionsSection}>
                  <div className={clsx(styles.incorrectOptionsTitle)}>
                    <h4>Why other options are incorrect:</h4>
                  </div>
                  <div className={styles.incorrectOptionsBody}>
                    <IncorrectOption />
                    <IncorrectOption />
                    <IncorrectOption />
                  </div>
                </div>
                <div className={styles.additionalResourcesSection}>
                  <div className={clsx(styles.resourcesTitle)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="currentColor"
                    >
                      <path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z" />
                    </svg>
                    <h4>Additional Resources</h4>
                  </div>
                  <div className={styles.resourcesBody}>
                    <Resource
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#0000F5"
                        >
                          <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z" />
                        </svg>
                      }
                      text={"Cellular Biology: Understanding Organelles"}
                    />
                    <Resource
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#0000F5"
                        >
                          <path d="M160-80q-17 0-28.5-11.5T120-120v-558q0-15 6-25.5t20-16.5l400-160q20-8 37 5.5t17 34.5v120h40q17 0 28.5 11.5T680-680v120h-80v-80H200v480h207l80 80H160Zm200-640h160v-62l-160 62ZM680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Zm-50-100 160-100-160-100v200Zm-430 20v-480 480Z" />
                        </svg>
                      }
                      text={"Video: Mitochondria and ATP Production"}
                    />
                    <Resource
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#0000F5"
                        >
                          <path d="M458-280q18 0 35.5-4.5T526-298l98 98 56-56-98-98q9-15 13.5-32.5T600-422q0-58-41-98t-99-40q-58 0-99 41t-41 99q0 58 40 99t98 41Zm2-80q-25 0-42.5-17.5T400-420q0-25 17.5-42.5T460-480q25 0 42.5 17.5T520-420q0 25-17.5 42.5T460-360ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                      }
                      text={
                        "Research Paper: Recent Advances in Mitochondrial Research"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomPart}>
          <button className={clsx(styles.previousBtn)}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#434343"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </span>
            Previous
          </button>
          <button className={clsx(styles.nextBtn)}>
            Next
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#ffffff"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

function Resource({ svg, text }) {
  return (
    <div className={styles.resource}>
      {svg}
      <p>{text}</p>
    </div>
  );
}

function IncorrectOption() {
  return (
    <div className={styles.incorrectOption}>
      <div className={clsx(styles.incorrectSvgContainer)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#BB271A"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>

      <p className={clsx(styles.incorrectOptionDescription)}>
        Protein synthesis - This is a complex process involving many organelles,
        but is not a primary function of mitochondria.
      </p>
    </div>
  );
}

function KeyPoint() {
  return (
    <div className={clsx(styles.keyPoint)}>
      <span></span>
      <p>
        They have a double membrane structure: an outer membrane and an inner
        membrane with many folds called cristae.
      </p>
    </div>
  );
}

function AnswerOption({ shitTemp }) {
  return (
    <div
      role="button"
      disabled={true}
      className={clsx(styles.answerOption, shitTemp && styles.correctAnswer)}
    >
      <div className={clsx(styles.answerLetterContainer)}>
        <p>A</p>
      </div>
      <p className={clsx(styles.answerText)}>Energy Production</p>
    </div>
  );
}

function QuizStats({ title, description }) {
  return (
    <div className={styles.quizStats}>
      <p className={clsx(styles.quizStatsTitle)}>{title}:</p>
      <p className={clsx(styles.quizStatsDescription)}>{description}</p>
    </div>
  );
}

function CorrectIncorrect({ bgColor, text }) {
  return (
    <div className={styles.correctIncorrect}>
      <span style={{ backgroundColor: bgColor }}></span>
      <p>{text}</p>
    </div>
  );
}

export default QuizReviewPage;
