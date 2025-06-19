import clsx from "clsx";
import styles from "./QuizDetailsPage.module.css";
import { FinishQuizCard } from "./FinishQuiz";
import { useContext } from "react";
import { QuizzesContext } from "../components/QuizzesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { WindowSizeContext } from "../../Main_App/components/WindowSizeContext";

function QuizDetailsPage() {
  const { dispatch } = useContext(QuizzesContext);
  const { windowWidth } = useContext(WindowSizeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const mobileView = windowWidth <= 500;

  const handleStartQuiz = () => {
    dispatch({ type: "openLoader", payload: location.state });
    console.log(location.state);
  };

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <div className={styles.quizDetailsPage}>
      <QuizDetailsMain mobileView={mobileView} />
      <QuizDetailsFooter
        mobileView={mobileView}
        handleStartQuiz={handleStartQuiz}
        handleBackBtn={handleBackBtn}
      />
    </div>
  );
}

function QuizDetailsMain({ mobileView }) {
  return (
    <div className={styles.quizDetailsMain}>
      <div className={styles.subContainer}>
        <div className={styles.subContainerLeft}>
          <h3 className={clsx(styles.quizInformationTitle)}>
            Quiz Information
          </h3>
          <div className={styles.flashCardsContainer}>
            <FlashCard
              value={30}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#535ae5"
                >
                  <path d="M480-240q20 0 34-14t14-34q0-20-14-34t-34-14q-20 0-34 14t-14 34q0 20 14 34t34 14Zm-36-153h73q0-37 6.5-52.5T555-485q35-34 48.5-58t13.5-53q0-55-37.5-89.5T484-720q-51 0-88.5 27T343-620l65 27q9-28 28.5-43.5T482-652q28 0 46 16t18 42q0 23-15.5 41T496-518q-35 32-43.5 52.5T444-393Zm36 297q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                </svg>
              }
              bgColor="#f9fafb"
              cardText="Questions"
              svgBgColor="F3E8FF"
            />
            <FlashCard
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#535ae5"
                >
                  <path d="M288-144v-72h156v-124q-42-8-77.5-33.5T313-434q-73-9-121-62.51T144-622v-26q0-29.7 21.15-50.85Q186.3-720 216-720h72v-96h384v96h72.21Q774-720 795-698.85T816-648v24q0 72-48 126.5T647-434q-18 35-53.5 60.5T516-340v124h156v72H288Zm0-372v-132h-72v24q0 37 19 65.5t53 42.5Zm192 108q50 0 85-35t35-85v-216H360v216q0 50 35 85t85 35Zm192-108q34-14 53-42.5t19-65.5v-24h-72v132Zm-192-59Z" />
                </svg>
              }
              value="70%"
              cardText="Passing Score"
              bgColor="#f9fafb"
              svgBgColor="F3E8FF"
            />
            <FlashCard
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#535ae5"
                >
                  <path d="M360-816v-72h240v72H360Zm84 432h72v-240h-72v240Zm36 288q-70 0-130.92-26.51-60.92-26.5-106.49-72.08-45.58-45.57-72.08-106.49Q144-362 144-432q0-70 26.51-130.92 26.5-60.92 72.08-106.49 45.57-45.58 106.49-72.08Q410-768 479.56-768q58.28 0 111.86 19.5T691-694l52-51 50 50-51 52q35 45 54.5 98.81T816-431.86q0 69.86-26.51 130.78-26.5 60.92-72.08 106.49-45.57 45.58-106.49 72.08Q550-96 480-96Zm0-72q110 0 187-77t77-187q0-110-77-187t-187-77q-110 0-187 77t-77 187q0 110 77 187t187 77Zm0-264Z" />
                </svg>
              }
              value="~1.2mins"
              cardText="Time Per Question"
              bgColor="#f9fafb"
              svgBgColor="F3E8FF"
            />
          </div>
          <div className={styles.detailsContainer}>
            <DetailsItem
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#535ae5"
                >
                  <path d="M192-192v-288h144v288H192Zm216 0v-576h144v576H408Zm216 0v-384h144v384H624Z" />
                </svg>
              }
              spanText={"Difficulty"}
              pText={"intermediate"}
            />
            <DetailsItem
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#535ae5"
                >
                  <path d="M444-144q-107-14-179.5-94.5T192-430q0-61 23-113.5t63-91.5l51 51q-30 29-47.5 69T264-430q0 81 51.5 140T444-217v73Zm72 0v-73q77-13 128.5-72.5T696-430q0-90-63-153t-153-63h-7l46 46-51 50-132-132 132-132 51 51-45 45h6q120 0 204 84t84 204q0 111-72.5 192T516-144Z" />
                </svg>
              }
              spanText={"Attempts allowed:"}
              pText={"2"}
            />
            <DetailsItem
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#535ae5"
                >
                  <path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                </svg>
              }
              spanText={"Review After:"}
              pText={"Yes, after submission"}
            />
          </div>
        </div>
        <div className={styles.subContainerRight}>
          <h3 className={clsx(styles.instructionsTitle)}>Instructions</h3>
          <div className={styles.instructionsContainer}>
            <InstructionItem
              instructionText={
                "Read each question carefully before selecting your answer. Some questions may have multiple correct options."
              }
            />
            <InstructionItem
              instructionText={
                "You can navigate between questions using the previous and next buttons. A question navigator will also be available."
              }
            />
            <InstructionItem
              instructionText={
                "Time management is crucial. Once the timer expires, your answers will be automatically submitted."
              }
            />
            <InstructionItem
              instructionText={
                "You can flag questions for review and return to them later if time permits."
              }
            />
            <InstructionItem
              instructionText={
                "Avoid refreshing the page or navigating away during the quiz as this may result in loss of progress."
              }
            />
            {mobileView && (
              <InstructionItem
                instructionText={
                  "Once you submit the quiz, you will immediately see your results and detailed feedback."
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashCard({ bgColor, svgBgColor, svg, cardText, value }) {
  return (
    <div style={{ backgroundColor: bgColor }} className={styles.finishQuizCard}>
      <div
        style={{ backgroundColor: svgBgColor }}
        className={styles.finishQuizCardSvgContainer}
      >
        {svg}
      </div>
      <p className={clsx(styles.finishCardText)}>{cardText}</p>
      <h3 className={clsx(styles.finishCardValue)}>{value}</h3>
    </div>
  );
}

function InstructionItem({ instructionText }) {
  return (
    <div className={styles.instructionItem}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="#535ae5"
      >
        <path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z" />
      </svg>
      <p>{instructionText}</p>
    </div>
  );
}

function DetailsItem({ svg, spanText, pText }) {
  return (
    <div className={styles.detailsItem}>
      {svg}
      <span>{spanText}</span>
      <p>{pText}</p>
    </div>
  );
}

function QuizDetailsFooter({ handleBackBtn, mobileView, handleStartQuiz }) {
  return (
    <div className={styles.quizDetailsFooter}>
      <button onClick={handleBackBtn} className={clsx(styles.backBtn)}>{`${
        mobileView ? "Back" : "Back to Quizzes"
      }`}</button>
      <button onClick={handleStartQuiz} className={clsx(styles.startQuizBtn)}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizDetailsPage;
