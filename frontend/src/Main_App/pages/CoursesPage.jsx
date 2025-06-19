import { useContext } from "react";
import { WindowSizeContext } from "../components/WindowSizeContext";
import MobileFooter from "../components/MobileFooter";
import Footer from "../components/Footer";

function CoursesPage() {
  const { windowWidth } = useContext(WindowSizeContext);
  const mobileView = windowWidth <= 500;
  return (
    <>
      <h3>My Courses</h3>
      {mobileView ? <MobileFooter /> : <Footer />}
    </>
  );
}

export default CoursesPage;
