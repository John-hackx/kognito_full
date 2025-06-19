import styles from "./TakeQuizMain.module.css";
import clsx from "clsx";
import ProgressBar from "../../Main_App/components/ProgressBar";
import { useParams } from "react-router-dom";
// import MathRenderer from "../../Quiz_Section/components/MathRenderer";
import InlineMath from "@matejmazur/react-katex";
import BlockMath from "@matejmazur/react-katex";
import { useContext, useEffect, useRef, useState } from "react";
import { QuizzesContext } from "./QuizzesContext";
import { numberToAlphabet } from "../../assets/reuseable functions/numberToAlphabet";
import { WindowSizeContext } from "../../Main_App/components/WindowSizeContext";
import { BackSvg, ForwardSvg } from "../../assets/data/svgHub";
import { ComponentScrollToTop } from "../../Main_App/components/ScrollToTop";
import { DraggableComponent } from "./DraggableComponent";

function TakeQuizMain() {
  const { state, dispatch, isMenuOpen } = useContext(QuizzesContext);
  const [flagged, setFlagged] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isFlaggedModalOpen, setIsFlaggedModalOpen] = useState(false);

  // const navigate = useNavigate();
  const { id } = useParams();
  const currentQuiz = state.quizzes.find((quiz) => id === quiz.id);
  const isMath = currentQuiz.title === "Mathematics";
  const hasAnswered = state.selectedAnswer;
  const { windowWidth } = useContext(WindowSizeContext);
  const mobileView = windowWidth <= 500;
  // handle functions;
  const handleOpenQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleOpenFlaggedModal = () => {
    setIsFlaggedModalOpen(true);
  };

  const handleFlagged = (e) => {
    setFlagged(e.target.checked);
  };

  const handleSubmitQuiz = () => {
    dispatch({ type: "submitQuiz" });
  };
  // console.log(state);
  const handleSelectedAnswer = (answer) => {
    dispatch({ type: "answered", payload: answer });
  };

  const handleNextBtn = () => {
    dispatch({ type: "next", payload: currentQuiz });
    setFlagged(false);
  };

  const handlePreviousBtn = () => {
    dispatch({ type: "previous" });
  };

  const handleFinishQuizBtn = () => {
    dispatch({ type: "submitQuiz" });
  };
  // console.log(location.state);
  // console.log(state);
  const mins = Math.floor(state.secondsRemaining / 60);
  const secs = state.secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timerTick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  useEffect(
    function () {
      flagged &&
        dispatch({
          type: "flagged",
          payload: currentQuiz.questions[state.index],
        });
      !flagged &&
        dispatch({
          type: "unflagged",
          payload: currentQuiz.questions[state.index],
        });
    },
    [flagged, dispatch, currentQuiz, state.index]
  );

  const questionSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.9625 13.5C9.225 13.5 9.44687 13.4094 9.62812 13.2281C9.80937 13.0469 9.9 12.825 9.9 12.5625C9.9 12.3 9.80937 12.0781 9.62812 11.8969C9.44687 11.7156 9.225 11.625 8.9625 11.625C8.7 11.625 8.47812 11.7156 8.29687 11.8969C8.11562 12.0781 8.025 12.3 8.025 12.5625C8.025 12.825 8.11562 13.0469 8.29687 13.2281C8.47812 13.4094 8.7 13.5 8.9625 13.5ZM8.2875 10.6125H9.675C9.675 10.2 9.72187 9.875 9.81562 9.6375C9.90937 9.4 10.175 9.075 10.6125 8.6625C10.9375 8.3375 11.1937 8.02812 11.3812 7.73437C11.5687 7.44062 11.6625 7.0875 11.6625 6.675C11.6625 5.975 11.4062 5.4375 10.8937 5.0625C10.3812 4.6875 9.775 4.5 9.075 4.5C8.3625 4.5 7.78437 4.6875 7.34062 5.0625C6.89687 5.4375 6.5875 5.8875 6.4125 6.4125L7.65 6.9C7.7125 6.675 7.85312 6.43125 8.07187 6.16875C8.29062 5.90625 8.625 5.775 9.075 5.775C9.475 5.775 9.775 5.88437 9.975 6.10312C10.175 6.32187 10.275 6.5625 10.275 6.825C10.275 7.075 10.2 7.30937 10.05 7.52812C9.9 7.74687 9.7125 7.95 9.4875 8.1375C8.9375 8.625 8.6 8.99375 8.475 9.24375C8.35 9.49375 8.2875 9.95 8.2875 10.6125ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9812 3.69375 14.3062C3.01875 13.6312 2.48437 12.8375 2.09062 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09062 6.075C2.48437 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48437 6.075 2.09062C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09062C12.8375 2.48437 13.6312 3.01875 14.3062 3.69375C14.9812 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9812 13.6312 14.3062 14.3062C13.6312 14.9812 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5ZM9 15C10.675 15 12.0937 14.4187 13.2562 13.2562C14.4187 12.0937 15 10.675 15 9C15 7.325 14.4187 5.90625 13.2562 4.74375C12.0937 3.58125 10.675 3 9 3C7.325 3 5.90625 3.58125 4.74375 4.74375C3.58125 5.90625 3 7.325 3 9C3 10.675 3.58125 12.0937 4.74375 13.2562C5.90625 14.4187 7.325 15 9 15Z"
        fill="#4F46E5"
      />
    </svg>
  );
  const timeSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.475 12.525L12.525 11.475L9.75 8.7V5.25H8.25V9.3L11.475 12.525ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9812 3.69375 14.3062C3.01875 13.6312 2.48437 12.8375 2.09062 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09062 6.075C2.48437 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48437 6.075 2.09062C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09062C12.8375 2.48437 13.6312 3.01875 14.3062 3.69375C14.9812 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9812 13.6312 14.3062 14.3062C13.6312 14.9812 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5ZM9 15C10.6625 15 12.0781 14.4156 13.2469 13.2469C14.4156 12.0781 15 10.6625 15 9C15 7.3375 14.4156 5.92187 13.2469 4.75312C12.0781 3.58437 10.6625 3 9 3C7.3375 3 5.92187 3.58437 4.75312 4.75312C3.58437 5.92187 3 7.3375 3 9C3 10.6625 3.58437 12.0781 4.75312 13.2469C5.92187 14.4156 7.3375 15 9 15Z"
        fill="#EE0606"
      />
    </svg>
  );

  const svgStylesQuestion = { backgroundColor: "#DBEAFE" };
  const svgStylesTime = { backgroundColor: "#FEE2E2" };
  const progressTextStyles = { display: "none" };
  const progressBarContainerStyles = { width: "100%", border: "none" };
  const progressBarStyles = {
    flex: "1",
    marginLeft: "-25px",
    border: "none",
  };
  const emptyProgressBarStyles = {
    backgroundColor: "#d9dbdb",
    width: "97%",
    maxWidth: "97%",
  };

  const colourKeys = [
    {
      text: "Current",
      colour: "#535ae5",
    },
    {
      text: "Answered",
      colour: "#f3f4f6",
    },
    {
      text: "Flagged",
      colour: "#f59e26",
    },
    {
      text: "Unanswered",
      colour: "#e5e7eb",
    },
  ];

  return (
    <div className={styles.takeQuizMain}>
      {isMenuOpen && <div className={styles.dimPage}></div>}
      {isQuestionModalOpen && <div className={styles.dimPage}></div>}
      {mobileView && (
        <DraggableComponent onClickFunction={handleOpenFlaggedModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
          </svg>
        </DraggableComponent>
      )}
      <div className={styles.layer}>
        <div className={styles.subMain}>
          <div className={styles.subMainLeft}>
            <div className={clsx(styles.quizBodyTop)}>
              <div className={clsx(styles.backIconSection)}>
                <div className={clsx(styles.backIcon)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
                </div>
              </div>

              <div className={clsx(styles.titleSection)}>
                <div className={styles.titleSectionLeft}>
                  <h4>{currentQuiz.title}</h4>
                  <div className={clsx(styles.levelAndNumbOfQuestions)}>
                    <p className={clsx(styles.level)}>{currentQuiz.level}</p>

                    <span></span>
                    <p className={clsx(styles.numbOfQuestions)}>
                      {currentQuiz.questions.length} questions
                    </p>
                  </div>
                </div>
                <div className={styles.titleSectionRight}>
                  {!mobileView && (
                    <QuizTopRightCard
                      svg={questionSvg}
                      svgStyles={svgStylesQuestion}
                    >
                      <p className={clsx(styles.currentQuestion)}>
                        Question {state.index + 1}/
                        {currentQuiz.questions.length}
                      </p>
                    </QuizTopRightCard>
                  )}
                  <QuizTopRightCard svg={timeSvg} svgStyles={svgStylesTime}>
                    <p className={clsx(styles.timeLeft)}>
                      {mins < 10 ? `0${mins}` : mins}:
                      {secs < 10 ? `0${secs}` : secs}
                    </p>
                  </QuizTopRightCard>
                </div>
              </div>
            </div>
            <div className={clsx(styles.quizBodyMiddle, styles.scrollable)}>
              {mobileView && isQuestionModalOpen && (
                <MobileQuestionsModal
                  isQuestionModalOpen={isQuestionModalOpen}
                  isFlaggedModalOpen={isFlaggedModalOpen}
                  setIsQuestionModalOpen={setIsQuestionModalOpen}
                >
                  <div className={styles.modalMain}>
                    {currentQuiz.questions.map((_, index) => (
                      <BoxQuestionNumber key={index} numb={index + 1} />
                    ))}
                  </div>
                  <div className={styles.modalColourKeys}>
                    {colourKeys.map((item) => (
                      <ColourKey text={item.text} colour={item.colour} />
                    ))}
                  </div>
                  <div className={styles.modalFooter}>
                    <button className={clsx(styles.saveProgressBtn)}>
                      Save Progress
                    </button>
                    <button
                      onClick={handleSubmitQuiz}
                      className={clsx(styles.submitBtn)}
                    >
                      Submit
                    </button>
                  </div>
                </MobileQuestionsModal>
              )}
              {mobileView && isFlaggedModalOpen && (
                <MobileQuestionsModal
                  setIsFlaggedModalOpen={setIsFlaggedModalOpen}
                  isQuestionModalOpen={isQuestionModalOpen}
                  isFlaggedModalOpen={isFlaggedModalOpen}
                >
                  <p className={styles.flaggedQuestion}>
                    What does it take to become an asshole? Is it good to be
                    one?
                  </p>
                  <p className={styles.flaggedQuestion}>
                    What does it take to become an asshole? Is it good to be
                    one?
                  </p>
                  <p className={styles.flaggedQuestion}>
                    What does it take to become an asshole? Is it good to be
                    one?
                  </p>
                  <p className={styles.flaggedQuestion}>
                    What does it take to become an asshole? Is it good to be
                    one?
                  </p>
                </MobileQuestionsModal>
              )}
              {!mobileView && (
                <ProgressBar
                  progressTextStyles={progressTextStyles}
                  progressBarContainerStyles={progressBarContainerStyles}
                  emptyProgressBarStyles={emptyProgressBarStyles}
                  progressBarStyles={progressBarStyles}
                  progress="80%"
                />
              )}
              {isMath && (
                <QuizBoxMaths
                  mobileView={mobileView}
                  handleSelectedAnswer={handleSelectedAnswer}
                  currentQuiz={currentQuiz}
                  state={state}
                />
              )}
              {!isMath && (
                <QuizBox
                  mobileView={mobileView}
                  handleFlagged={handleFlagged}
                  flagged={flagged}
                  handleSelectedAnswer={handleSelectedAnswer}
                  state={state}
                  currentQuiz={currentQuiz}
                />
              )}
            </div>
            <div className={clsx(styles.quizBodyBottom)}>
              <div className={styles.quizBodyBottomLeft}>
                {!mobileView ? (
                  <button
                    onClick={handlePreviousBtn}
                    disabled={state.index === 0}
                    className={clsx(styles.prevBtn)}
                  >
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.6502 14.6666L11.8335 13.4833L6.35016 7.99998L11.8335 2.51665L10.6502 1.33331L3.9835 7.99998L10.6502 14.6666Z"
                          fill="white"
                        />
                      </svg>
                    </span>{" "}
                    Previous
                  </button>
                ) : (
                  <BackSvg
                    classname={styles.mobilePrevious}
                    handleOnClick={handlePreviousBtn}
                    hasAnswered={hasAnswered}
                    state={state}
                  />
                )}
                {mobileView && (
                  <div
                    onClick={handleOpenQuestionModal}
                    className={styles.allQuestions}
                  >
                    <div className={styles.subAllQuestions}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#434343"
                      >
                        <path d="M643-216 507-352l51-51 84 85 170-170 52 51-221 221Zm0-312L507-664l51-51 85 85 169-170 52 51-221 221ZM96-288v-72h336v72H96Zm0-312v-72h336v72H96Z" />
                      </svg>
                      <p>All Questions</p>
                    </div>
                  </div>
                )}
                {!mobileView &&
                currentQuiz.questions.length === state.index + 1 ? (
                  <FinishQuizBtn
                    hasAnswered={hasAnswered}
                    handleFinishQuizBtn={handleFinishQuizBtn}
                  />
                ) : (
                  !mobileView && (
                    <button
                      onClick={handleNextBtn}
                      disabled={!hasAnswered}
                      className={clsx(styles.nextBtn)}
                    >
                      Next{" "}
                      <span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.34984 14.6666L4.1665 13.4833L9.64984 7.99998L4.1665 2.51665L5.34984 1.33331L12.0165 7.99998L5.34984 14.6666Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </button>
                  )
                )}
                {mobileView && (
                  <ForwardSvg
                    handleOnClick={handleNextBtn}
                    classname={styles.mobileNext}
                    hasAnswered={hasAnswered}
                  />
                )}
              </div>
              {!mobileView && (
                <div className={styles.quizBodyBottomRight}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RoundQuestionNumber key={index} numb={index + 1} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.subMainRight}>
            <div className={styles.finishedButtonsContainer}>
              <button className={clsx(styles.saveProgressBtn)}>
                Save Progress
              </button>
              <button
                onClick={handleSubmitQuiz}
                className={clsx(styles.submitBtn)}
              >
                Submit Quiz
              </button>
            </div>
            <div className={styles.flaggedQuestionsContainer}>
              <div className={clsx(styles.flagHeader)}>
                <p>Flagged Questions</p>
              </div>
              <div className={clsx(styles.flagBody)}>
                {state.flaggedQuestions?.map((_, index) => (
                  <RoundQuestionNumber
                    key={index}
                    numb={
                      currentQuiz.questions.indexOf(
                        currentQuiz.questions[state.index]
                      ) + 1
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileQuestionsModal({
  children,
  setIsQuestionModalOpen,
  setIsFlaggedModalOpen,
  isQuestionModalOpen,
}) {
  return (
    <div className={styles.mobileQuestionsModal}>
      <div className={styles.modalHeader}>
        <p>All Questions</p>
        <svg
          onClick={() => {
            isQuestionModalOpen
              ? setIsQuestionModalOpen(false)
              : setIsFlaggedModalOpen(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#434343"
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </div>
      <div className={styles.modalBody}>{children}</div>
    </div>
  );
}

function ColourKey({ colour, text }) {
  return (
    <div className={styles.colourKey}>
      <span style={{ backgroundColor: colour }}></span>
      <p>{text}</p>
    </div>
  );
}

function BoxQuestionNumber({ numb }) {
  return (
    <div className={styles.boxQuestionNumber}>
      <p>{numb}</p>
    </div>
  );
}

function FinishQuizBtn({ hasAnswered, handleFinishQuizBtn }) {
  return (
    <button
      disabled={!hasAnswered}
      onClick={handleFinishQuizBtn}
      className={clsx(styles.nextBtn)}
    >
      Finish Quiz
    </button>
  );
}

function RoundQuestionNumber({ numb }) {
  return (
    <div className={styles.roundQuestionNumber}>
      <p>{numb}</p>
    </div>
  );
}

function QuizBox({
  handleSelectedAnswer,
  currentQuiz,
  state,
  flagged,
  handleFlagged,
  mobileView,
}) {
  const scrollRef = useRef(null);
  return (
    <>
      <ComponentScrollToTop scrollRef={scrollRef} />
      <div ref={scrollRef} className={styles.quizBox}>
        <div className={styles.quizBoxTop}>
          <div className={styles.question}>
            <span>{state.index + 1}.</span>
            <p>{currentQuiz.questions[state.index].question}</p>
          </div>
          <div className={styles.flagQuestion}>
            {!mobileView && (
              <label>
                <input
                  type="checkbox"
                  onChange={handleFlagged}
                  checked={flagged}
                />
                <span>Flag for review</span>
              </label>
            )}
            {mobileView && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
              </svg>
            )}
          </div>
        </div>
        <div className={styles.quizBoxBottom}>
          {currentQuiz.questions[state.index].options.map((item, index) => (
            <AnswerOption
              state={state}
              key={item}
              handleSelectedAnswer={handleSelectedAnswer}
              answer={item}
              optionLetter={numberToAlphabet(index)}
              optionText={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function QuizBoxMaths({
  mobileView,
  handleSelectedAnswer,
  currentQuiz,
  state,
}) {
  const scrollRef = useRef(null);
  return (
    <>
      <ComponentScrollToTop scrollRef={scrollRef} />
      <div ref={scrollRef} className={styles.quizBox}>
        <div className={styles.quizBoxMathsTop}>
          <div className={clsx(styles.quizBoxMathsTopLeft)}>
            <p className={clsx(styles.mathQuestion)}>
              {state.index + 1}. {currentQuiz.questions[state.index].question}
            </p>
            {currentQuiz.questions[state.index].isMath && (
              <p className={clsx(styles.mathExpression)}>
                <BlockMath
                  math={currentQuiz.questions[state.index].mathExpression}
                />
              </p>
            )}
          </div>
          <div className={clsx(styles.quizBoxMathsTopRight)}>
            {!mobileView && (
              <label>
                <input type="checkbox" />
                <span>Flag for review</span>
              </label>
            )}
            {mobileView && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
              </svg>
            )}
          </div>
        </div>
        <div className={styles.quizBoxBottom}>
          {currentQuiz.questions[state.index].options.map((item, index) => (
            <AnswerOptionMath
              state={state}
              key={item}
              handleSelectedAnswer={handleSelectedAnswer}
              answer={item}
              optionLetter={numberToAlphabet(index)}
              optionText={item}
            />
          ))}
          {/* <AnswerOption />
        <AnswerOption />
        <AnswerOption />
        <AnswerOption /> */}
        </div>
      </div>
    </>
  );
}

export function AnswerOptionMath({
  state,
  handleSelectedAnswer,
  optionLetter,
  optionText,
  answer,
}) {
  return (
    <div
      role="button"
      onClick={() => handleSelectedAnswer(answer)}
      className={clsx(
        styles.answerOptionMath,
        answer === state.selectedAnswer ? styles.activeAnswer : ""
      )}
    >
      <span className={clsx(styles.optionLetter)}>{optionLetter}</span>
      <p className={clsx(styles.optionText)}>
        <InlineMath math={optionText} />
      </p>
    </div>
  );
}

export function AnswerOption({
  state,
  handleSelectedAnswer,
  optionLetter,
  optionText,
  answer,
}) {
  return (
    <div
      role="button"
      onClick={() => handleSelectedAnswer(answer)}
      className={clsx(
        styles.answerOption,
        answer === state.selectedAnswer ? styles.activeAnswer : ""
      )}
    >
      <span className={clsx(styles.optionLetter)}>{optionLetter}</span>
      <p className={clsx(styles.optionText)}>{optionText}</p>
    </div>
  );
}

function QuizTopRightCard({ children, svg, svgStyles }) {
  return (
    <div className={styles.quizTopRightCard}>
      <div style={svgStyles} className={styles.svgContainer}>
        {svg}
      </div>
      {children}
    </div>
  );
}

export default TakeQuizMain;
