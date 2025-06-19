import React, { useEffect, useState } from "react";
import image1 from "../../assets/images/dataScience.jpg";
import image2 from "../../assets/images/digitalMarketing.jpg";
import image3 from "../../assets/images/img 2.jpg";
import image4 from "../../assets/images/img 3.jpg";
// import { useSwipeable } from "react-swipeable";

function PracticePage() {
  const [index, setIndex] = useState(0);
  const images = [image1, image2, image3, image4];

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(
    function () {
      const id = setInterval(() => {
        goToNext();
      }, 3000);
      return () => clearInterval(id);
    },
    [index]
  );

  return (
    <div
      style={{
        width: "600px",
        height: "300px",
        position: "relative",
        margin: "auto",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      <img
        src={images[index]}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );
}

export default PracticePage;
