import { useContext } from "react";
import QuizzesMain from "../components/QuizzesMain";
import { WindowSizeContext } from "../../Main_App/components/WindowSizeContext";
import MobileFooter from "../../Main_App/components/MobileFooter";
import Footer from "../../Main_App/components/Footer";

function QuizzesPage() {
  const { windowWidth } = useContext(WindowSizeContext);

  const mobileView = windowWidth <= 500;

  return (
    <>
      <QuizzesMain />
      {mobileView ? <MobileFooter /> : <Footer />}
    </>
  );
}

export default QuizzesPage;
