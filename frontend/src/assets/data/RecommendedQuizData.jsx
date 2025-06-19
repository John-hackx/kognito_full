import image1 from "../images/dataScience.jpg";
import image2 from "../images/img 2.jpg";
import image3 from "../images/img 3.jpg";
import image4 from "../images/digitalMarketing.jpg";

const recommendedQuizzesRaw = [
  {
    image: image1,
    title: "Physics",
    level: "Intermediate",
    time: "25",
    questions: "20",
    rating: 4.5,
    attempts: 100,
  },
  {
    image: image2,
    title: "Chemistry",
    level: "Beginner",
    time: "30",
    questions: "15",
    rating: 3.9,
    attempts: 80,
  },
  {
    image: image3,
    title: "Mathematics",
    level: "Advanced",
    time: "45",
    questions: "30",
    rating: 4.8,
    attempts: 120,
  },
  {
    image: image4,
    title: "Digital Marketing",
    level: "Beginner",
    time: "60",
    questions: "50",
    rating: 4.2,
    attempts: 90,
  },
];

export const recommendedQuizzes = recommendedQuizzesRaw.map((quiz) => {
  return {
    ...quiz,
    levelStyles: {
      backgroundColor:
        quiz.level === "Beginner"
          ? "#E0F7FA"
          : quiz.level === "Intermediate"
          ? "#FFF3E0"
          : "#FCE4EC",
      color:
        quiz.level === "Beginner"
          ? "#00796B"
          : quiz.level === "Intermediate"
          ? "#FF6F00"
          : "#880E4F",
    },
  };
});
