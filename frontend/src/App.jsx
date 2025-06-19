import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Main_App/pages/DashboardPage";
import CoursesPage from "./Main_App/pages/CoursesPage";
import CalenderPage from "./Main_App/pages/CalenderPage";
import MessagesPage from "./Main_App/pages/MessagesPage";
import QuizHubHome from "./Quiz_Section/pages/QuizHubHome";
import PracticeTestPage from "./Main_App/pages/PracticeTestPage";
import BookmarksPage from "./Main_App/pages/BookmarksPage";
import CertificatesPage from "./Main_App/pages/CertificatesPage";
import DownloadsPage from "./Main_App/pages/DownloadsPage";
import AccountPage from "./Main_App/pages/AccountPage";
import PreferencesPage from "./Main_App/pages/PreferencesPage";
import HelpPage from "./Main_App/pages/HelpPage";
import ErrorPage from "./Main_App/pages/ErrorPage";
import QuizzesPage from "./Quiz_Section/pages/QuizzesPage";
import PracticePage from "./Quiz_Section/pages/PracticePage";
import TutorConsultPage from "./Quiz_Section/pages/TutorConsultPage";
import QuizHubDashboard from "./Quiz_Section/pages/QuizHubDashboard";
import TakeQuizPage from "./Quiz_Section/pages/TakeQuizPage";
import FinishQuiz from "./Quiz_Section/pages/FinishQuiz";
import QuizReviewPage from "./Quiz_Section/pages/QuizReviewPage";
import { WindowSizeContext } from "./Main_App/components/WindowSizeContext";
import { useEffect, useState } from "react";
import { ScrollToTop } from "./Main_App/components/ScrollToTop";
import LandingPage from "./Main_App/pages/LandingPage";
import AuthContainer from "./Main_App/pages/AuthContainer";
function App() {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(function () {
    const getWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", getWindowWidth);

    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  return (
    <WindowSizeContext.Provider value={{ windowWidth }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/app/courses" element={<CoursesPage />} />
          <Route path="/app/calendar" element={<CalenderPage />} />
          <Route path="/app/messages" element={<MessagesPage />} />

          <Route path="/app/quizhub" element={<QuizHubDashboard />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<QuizHubHome />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="quizzes/:id" element={<TakeQuizPage />} />
            <Route path="quizzes/:id/quizreview" element={<QuizReviewPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="tutors" element={<TutorConsultPage />} />
          </Route>
          <Route path="practicetest" element={<PracticeTestPage />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="preferences" element={<PreferencesPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </WindowSizeContext.Provider>
  );
}

export default App;
