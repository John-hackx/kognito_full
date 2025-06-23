import { Link, NavLink } from "react-router-dom";
import styles from "./Main.module.css";
import clsx from "clsx";

// Data imports
import { categories } from "../../assets/data/categoryData";
import { courseProgress } from "../../assets/data/courseProgressData";
import { upcomingClasses } from "../../assets/data/upcomingClassesData";
import { recommendedCourses } from "../../assets/data/recommendedCoursesData";

// Component imports
import CourseProgressCard from "./CourseProgressCard";
import ProgressBar from "./ProgressBar";
import { useContext } from "react";
import { WindowSizeContext } from "./WindowSizeContext";
import { DashboardContext } from "./DashboardContext";
import useAuthStore from "../../stores/authStore";

function Main({ isMenuOpen }) {
  const { windowWidth } = useContext(WindowSizeContext);
  const { user } = useAuthStore();
  // const { dashboardState } = useContext(DashboardContext);
  const mobileView = windowWidth <= 500;

  return (
    <div className={clsx(styles.main)}>
      {mobileView && isMenuOpen && <div className={styles.dimPage}></div>}
      <div className={clsx(styles.left)}>
        {categories.map((category) => (
          <SideCategory
            key={category.title}
            title={category.title}
            content={category.content}
          />
        ))}
      </div>
      <div className={clsx(styles.right)}>
        {windowWidth <= 1080 && (
          <div
            style={{ zIndex: isMenuOpen && "-1" }}
            className={clsx(styles.mobileViewSearch)}
          >
            <svg
              fill="currentColor"
              height="20px"
              width="20px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 231 231"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              enable-background="new 0 0 231 231"
              transform="rotate(-45)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="m198.021,82.5c0-45.563-36.853-82.5-82.417-82.5s-82.625,36.937-82.625,82.5c0,39.734 28.375,72.9 65.375,80.738v67.762h33v-67.564c38-7.452 66.667-40.848 66.667-80.936zm-82.334,49.5c-27.294,0-49.5-22.206-49.5-49.5s22.206-49.5 49.5-49.5 49.5,22.206 49.5,49.5-22.206,49.5-49.5,49.5z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <input type="text" placeholder="Search for courses..." />
          </div>
        )}
        <div className={clsx(styles.welcomeHero)}>
          <div className={styles.welcomeHeader}>
            <div className={clsx(styles.welcomeHeaderText)}>
              <h3>Welcome Back, {user.firstName}!</h3>
              {mobileView ? (
                <p>You're making great progress</p>
              ) : (
                <p>Here’s what’s happening with your learning journey.</p>
              )}
            </div>
            <div className={clsx(styles.welcomeHeaderChart)}></div>
          </div>
          <div className={styles.welcomeContent}>
            <HeroCard bgColor="#A855F7" />
            <HeroCard bgColor="#22C55E" />
            <HeroCard bgColor="#FB923C" />
            <HeroCard bgColor="#4F46E5" />
          </div>
        </div>
        <div className={clsx(styles.courseProgress)}>
          <div className={clsx(styles.courseProgressHeader)}>
            <h3>Course Progress</h3>
          </div>
          <div className={clsx(styles.courseProgressBody)}>
            {courseProgress.map((course) => (
              <CourseProgressCard
                key={course.courseName}
                topRightPtext="instructor"
                BtnText={mobileView ? "Continue" : "Continue Learning"}
                courseName={course.courseName}
                instructor={course.instructor}
                image={course.image}
                progress={course.progress}
                lessonsCompleted={course.lessonsCompleted}
                lessonsTotal={course.lessonsTotal}
              >
                {course.lessonsCompleted} of {course.lessonsTotal} lessons
                completed
              </CourseProgressCard>
            ))}
          </div>
        </div>
        <div className={clsx(styles.upcomingClasses)}>
          <div className={clsx(styles.upcomingClassesHeader)}>
            <h3>Upcoming Classes</h3>
          </div>
          <div className={clsx(styles.upcomingClassesBody)}>
            {upcomingClasses.map((upClass) => (
              <UpcomingClassesCard
                mobileView={mobileView}
                key={upClass.title}
                lessonTypeBgColor={upClass.lessonTypeBgColor}
                bgColor={upClass.bgColor}
                dateText={upClass.dateText}
                time={upClass.time}
                title={upClass.title}
                lessonType={upClass.lessonType}
                instructor={upClass.instructor}
                duration={upClass.duration}
                buttonText={upClass.buttonText}
                buttonLink={upClass.buttonLink}
              />
            ))}
            {/* <UpcomingClassesCard bgColor="#4F46E5" />
            <UpcomingClassesCard bgColor="#FB923C" />
            <UpcomingClassesCard bgColor="#22C55E" />
            <UpcomingClassesCard bgColor="#A855F7" /> */}
          </div>
        </div>
        <div className={clsx(styles.bottomSection)}>
          {!mobileView && (
            <div className={clsx(styles.statisticsContainer)}>
              <div className={clsx(styles.statsHeader)}>
                <h4>Learning Analytics</h4>
                <div className={clsx(styles.weeklyStudy)}>
                  <p className={clsx(styles.studyTimeText)}>
                    Weekly Study Time
                  </p>
                  <span>Last 7 days</span>
                </div>
              </div>
              <div className={clsx(styles.statsGraph)}>
                {/* statistics graph goes here */}
              </div>
              <div className={clsx(styles.statsAverage)}>
                <p>Course Completion Rate</p>
                <span>Above Average</span>
              </div>
              <ProgressBar />
              <p className={clsx(styles.learningStreakText)}>
                Current Learning Streak
              </p>
              <div className={styles.daysContainer}>
                <DayCard day="M" />
                <DayCard day="T" />
                <DayCard day="W" />
                <DayCard day="T" />
                <DayCard day="F" />
                <DayCard day="S" />
                <DayCard day="S" />
                <DayCard day="S" />
                <DayCard day="S" />
              </div>
            </div>
          )}
          <div className={clsx(styles.recommendedContainer)}>
            <div className={clsx(styles.recommendedHeader)}>
              <h4>Recommended for You</h4>
            </div>
            <div className={clsx(styles.recommendedCardsContainer)}>
              {mobileView
                ? recommendedCourses.map((course) => (
                    <RecommendedCard
                      mobileView={mobileView}
                      key={course.title}
                      image={course.image}
                      title={course.title}
                      rating={course.rating}
                      description={course.description}
                      level={course.level}
                      duration={course.duration}
                    />
                  ))
                : Array.from({ length: 2 }).map((_, index) => (
                    <RecommendedCard
                      mobileView={mobileView}
                      key={recommendedCourses[index].title}
                      image={recommendedCourses[index].image}
                      title={recommendedCourses[index].title}
                      rating={recommendedCourses[index].rating}
                      description={recommendedCourses[index].description}
                      level={recommendedCourses[index].level}
                      duration={recommendedCourses[index].duration}
                    />
                  ))}
              {/* <RecommendedCard image={programmingImage}/>
              <RecommendedCard image={machineLearningImage} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendedCard({
  image,
  title,
  rating,
  description,
  level,
  duration,
  mobileView,
}) {
  return (
    <div className={clsx(styles.recommendedCard)}>
      <div className={clsx(styles.recommendedCardImage)}>
        <img src={image} alt="Course" />
      </div>
      <div className={clsx(styles.recommendedCardTitle)}>
        <h4>{title}</h4>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#B89230"
          >
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
          </svg>
          <p>{rating}</p>
        </span>
      </div>
      {!mobileView && (
        <div className={clsx(styles.recommendedCardDescription)}>
          <p>{description}</p>
        </div>
      )}
      <div className={clsx(styles.recommendedCardTime)}>
        <div className={clsx(styles.time)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#9196a0"
          >
            <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
          </svg>
          <p>{duration}</p>
        </div>
        <div className={clsx(styles.level)}>
          <p>{level}</p>
        </div>
      </div>
      <div className={clsx(styles.recommendedCardButton)}>
        <button>Start Course</button>
      </div>
    </div>
  );
}

function DayCard({ day }) {
  return (
    <div className={clsx(styles.day)}>
      <p>{day}</p>
    </div>
  );
}

function SideCategory({ title, content }) {
  return (
    <div className={clsx(styles.sideCategory)}>
      <div className={clsx(styles.sideCategoryTitle)}>
        <p>{title}</p>
      </div>

      {content.map((item) => (
        <CategoryItem
          key={item.text}
          svg={item.svg}
          text={item.text}
          link={item.link}
        />
      ))}
    </div>
  );
}

function CategoryItem({ svg, text, link }) {
  return (
    <div className={clsx(styles.categoryItem)}>
      <NavLink to={link} className={clsx(styles.categoryItemLink)}>
        <div>{svg}</div>
        <p>{text}</p>
      </NavLink>
    </div>
  );
}

function HeroCard({ bgColor }) {
  const heroStyles = { backgroundColor: bgColor };
  return <div style={heroStyles} className={clsx(styles.heroCard)}></div>;
}

// function CourseProgressCard({courseName, instructor, image, progress, lessonsCompleted, lessonsTotal}) {
//   const progressBarStyles = {width: `${progress}%`, maximumWidth: `${progress}%`}
//   return (
//     <div className={clsx(styles.progressCard)}>
//       <div className={styles.progressTop}>
//         <div className={clsx(styles.progressTopLeft)}>
//           <div className={styles.progressImage}>
//             <img src={image} alt="Course" />
//           </div>
//         </div>
//         <div className={clsx(styles.progressTopRight)}>
//           <h4>{courseName}</h4>
//           <p>Instructor: {instructor}</p>
//           <div className={clsx(styles.progressBars)}>
//             <span className={clsx(styles.emptyProgressBar)}></span>
//             <span style={progressBarStyles} className={clsx(styles.filledProgressBar)}></span>
//           </div>
//           <p className={clsx(styles.progressText)}>{progress}%</p>
//         </div>
//       </div>
//       <div className={styles.progressBottom}>
//         <p>{lessonsCompleted} of {lessonsTotal} lessons completed</p>
//         <button>Continue Learning</button>
//       </div>
//     </div>
//   )
// }

function UpcomingClassesCard({
  bgColor,
  lessonTypeBgColor,
  dateText,
  time,
  title,
  lessonType,
  instructor,
  duration,
  buttonText,
  buttonLink,
  mobileView,
}) {
  const lessonTypeStyles = {
    backgroundColor: lessonTypeBgColor,
    color: bgColor,
  };
  const upcomingStyles = { backgroundColor: !mobileView ? bgColor : "#ffffff" };
  return (
    <div style={upcomingStyles} className={clsx(styles.upcomingClassesCard)}>
      <div className={clsx(styles.upcomingClassesSubCard)}>
        <div className={styles.classesTitle}>
          <p className={clsx(styles.classesTime)}>
            {dateText}, {time}
          </p>
          <p style={lessonTypeStyles} className={clsx(styles.classesType)}>
            {lessonType}
          </p>
        </div>
        <p className={clsx(styles.classesDuration)}>{duration}</p>
        <p className={styles.classesSubject}>{title}</p>
        <p className={clsx(styles.classesTutor)}>{instructor}</p>
        <Link to={buttonLink}>
          <button className={clsx(styles.classesJoinButton)}>
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
