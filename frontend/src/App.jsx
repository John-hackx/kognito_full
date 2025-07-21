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
//admin
import AdminPage from "./admin/AdminPage";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCourses from "./admin/AdminCourses";
import AdminBlog from "./admin/AdminBlog";
import AdminCoupons from "./admin/AdminCoupons";
import AdminAuthentication from "./admin/AdminAuthentication";
import AdminSettings from "./admin/AdminSettings";
//...
import QuizReviewPage from "./Quiz_Section/pages/QuizReviewPage";
import { WindowSizeContext } from "./Main_App/components/WindowSizeContext";
import { useEffect, useState } from "react";
import { ScrollToTop } from "./Main_App/components/ScrollToTop";
import LandingPage from "./Main_App/pages/LandingPage";
import AuthContainer from "./Main_App/pages/AuthContainer";
import useAuthStore from "./stores/authStore";
import ProtectedRoute from "./Main_App/components/ProtectedRoute";
import AdminCoursesProv from "./admin/AdminCourses";
function App() {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const { user, isLoading, checkAuth } = useAuthStore();

  useEffect(function () {
    const getWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", getWindowWidth);

    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user && !isLoading) {
        await checkAuth();
      }
    };
    checkAuthentication();
  }, [checkAuth, user, isLoading]);

  // console.log(user);

  return (
    <WindowSizeContext.Provider value={{ windowWidth }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCoursesProv />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="authentication" element={<AdminAuthentication />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route
            path="/auth"
            element={user ? <Navigate to="/app" replace /> : <AuthContainer />}
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                {" "}
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/calendar"
            element={
              <ProtectedRoute>
                {" "}
                <CalenderPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/messages"
            element={
              <ProtectedRoute>
                {" "}
                <MessagesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/app/quizhub"
            element={
              <ProtectedRoute>
                <QuizHubDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<QuizHubHome />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="quizzes/:id" element={<TakeQuizPage />} />
            <Route path="quizzes/:id/quizreview" element={<QuizReviewPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="tutors" element={<TutorConsultPage />} />
          </Route>
          <Route
            path="/app/practicetest"
            element={
              <ProtectedRoute>
                <PracticeTestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/certificates"
            element={
              <ProtectedRoute>
                <CertificatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/downloads"
            element={
              <ProtectedRoute>
                <DownloadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/preferences"
            element={
              <ProtectedRoute>
                <PreferencesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/help"
            element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </WindowSizeContext.Provider>
  );
}

export default App;
