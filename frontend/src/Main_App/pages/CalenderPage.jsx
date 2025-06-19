import MobileFooter from "../components/MobileFooter";
import Footer from "../components/Footer";
import { useContext } from "react";
import { WindowSizeContext } from "../components/WindowSizeContext";

function CalenderPage() {
  const { windowWidth } = useContext(WindowSizeContext);
  const mobileView = windowWidth <= 500;
  return (
    <>
      <h3>calender page</h3>
      {mobileView ? <MobileFooter /> : <Footer />}
    </>
  );
}

export default CalenderPage;
