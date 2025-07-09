import React, { act, useState } from "react";
import styles from "./AdminCourses.module.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import clsx from "clsx";
import courseImage1 from "../assets/images/course-1.jpg";

type clickFuncType = () => void;

const headerTabs: string[] = [
  "Course Details",
  "Course Content",
  "Pricing & Access",
  "Settings",
];

export default function AdminCourses() {
  const [isCreateCourse, setIsCreateCourse] = useState<boolean>(false);
  const [isVideoCourse, setIsVideoCourse] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("Course Details");

  const handleCoursesBtn = () => {
    setIsCreateCourse(false);
  };

  const handleCreateCourseBtn = () => {
    setIsCreateCourse(true);
  };

  const handleVideoType: clickFuncType = () => {
    setIsVideoCourse(true);
  };

  const handleReadingType: clickFuncType = () => {
    setIsVideoCourse(false);
  };

  const handleHeaderTab = (tabName: string): void => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles.adminCourses}>
      <div className={styles.adminCoursesContainer}>
        <div className={styles.adminCoursesLeft}>
          <Sidebar />
        </div>
        <div className={styles.adminCoursesRight}>
          <Header>
            <div className={styles.createBtns}>
              <button
                onClick={handleCoursesBtn}
                className={clsx(
                  styles.coursesBtn,
                  !isCreateCourse && styles.btnActive
                )}
              >
                Courses
              </button>
              <button
                onClick={handleCreateCourseBtn}
                className={clsx(
                  styles.createCourseBtn,
                  isCreateCourse && styles.btnActive
                )}
              >
                Create Course
              </button>
            </div>
          </Header>
          {!isCreateCourse && <Courses />}
          {isCreateCourse && (
            <CreateCourse
              handleHeaderTab={handleHeaderTab}
              activeTab={activeTab}
              isVideoCourse={isVideoCourse}
              handleVideoType={handleVideoType}
              handleReadingType={handleReadingType}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <div className={styles.coursesSection}>
      <div className={styles.coursesSectionHeader}>
        <p>Available Courses (Total: 12)</p>
      </div>
      <div className={styles.coursesSectionBody}>
        <div className={styles.coursesContainer}>
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div>
  );
}

function CourseCard() {
  return (
    <div className={styles.course}>
      <div className={styles.courseTop}>
        <div className={styles.courseTopContainer}>
          <img src={courseImage1} alt="course-image" />
        </div>
      </div>
      <div className={styles.courseBottom}>
        <div className={styles.level}>
          <p>Beginner</p>
        </div>
        <div className={styles.title}>
          <p>Responive Website - HTML, CSS, JAVASCRIPT</p>
        </div>
        <div className={styles.rating}>
          <span>
            {Array.from({ length: 4 }).map((_, i) => (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.36875 15.75L5.5875 10.4813L1.5 6.9375L6.9 6.46875L9 1.5L11.1 6.46875L16.5 6.9375L12.4125 10.4813L13.6312 15.75L9 12.9563L4.36875 15.75Z"
                  fill="#F19E39"
                />
              </svg>
            ))}
          </span>
          <p>(5.0/7 rating)</p>
        </div>
        <div className={styles.time}>
          <p>15hrs</p>
        </div>
        <div className={styles.lessonsAndStudents}>
          <div className={styles.lessons}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.625 16.5C4.9 16.5 4.28125 16.2438 3.76875 15.7313C3.25625 15.2188 3 14.6 3 13.875V4.125C3 3.4 3.25625 2.78125 3.76875 2.26875C4.28125 1.75625 4.9 1.5 5.625 1.5H15V12.75C14.6875 12.75 14.4219 12.8594 14.2031 13.0781C13.9844 13.2969 13.875 13.5625 13.875 13.875C13.875 14.1875 13.9844 14.4531 14.2031 14.6719C14.4219 14.8906 14.6875 15 15 15V16.5H5.625ZM4.5 11.4938C4.675 11.4062 4.85625 11.3438 5.04375 11.3063C5.23125 11.2688 5.425 11.25 5.625 11.25H6V3H5.625C5.3125 3 5.04687 3.10938 4.82812 3.32813C4.60937 3.54688 4.5 3.8125 4.5 4.125V11.4938ZM7.5 11.25H13.5V3H7.5V11.25ZM5.625 15H12.6187C12.5437 14.825 12.4844 14.6469 12.4406 14.4656C12.3969 14.2844 12.375 14.0875 12.375 13.875C12.375 13.675 12.3937 13.4813 12.4312 13.2938C12.4687 13.1063 12.5312 12.925 12.6187 12.75H5.625C5.3 12.75 5.03125 12.8594 4.81875 13.0781C4.60625 13.2969 4.5 13.5625 4.5 13.875C4.5 14.2 4.60625 14.4688 4.81875 14.6813C5.03125 14.8938 5.3 15 5.625 15Z"
                fill="#D9D9D9"
              />
            </svg>
            <p>8 Lessons</p>
          </div>
          <div className={styles.students}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 13.5V12.3188C0 11.7813 0.275 11.3438 0.825 11.0063C1.375 10.6688 2.1 10.5 3 10.5C3.1625 10.5 3.31875 10.5031 3.46875 10.5094C3.61875 10.5156 3.7625 10.5313 3.9 10.5563C3.725 10.8188 3.59375 11.0938 3.50625 11.3813C3.41875 11.6688 3.375 11.9688 3.375 12.2813V13.5H0ZM4.5 13.5V12.2813C4.5 11.8813 4.60938 11.5156 4.82812 11.1844C5.04688 10.8531 5.35625 10.5625 5.75625 10.3125C6.15625 10.0625 6.63438 9.875 7.19063 9.75C7.74688 9.625 8.35 9.5625 9 9.5625C9.6625 9.5625 10.2719 9.625 10.8281 9.75C11.3844 9.875 11.8625 10.0625 12.2625 10.3125C12.6625 10.5625 12.9688 10.8531 13.1813 11.1844C13.3938 11.5156 13.5 11.8813 13.5 12.2813V13.5H4.5ZM14.625 13.5V12.2813C14.625 11.9563 14.5844 11.65 14.5031 11.3625C14.4219 11.075 14.3 10.8063 14.1375 10.5563C14.275 10.5313 14.4156 10.5156 14.5594 10.5094C14.7031 10.5031 14.85 10.5 15 10.5C15.9 10.5 16.625 10.6656 17.175 10.9969C17.725 11.3281 18 11.7688 18 12.3188V13.5H14.625ZM6.09375 12H11.925C11.8 11.75 11.4531 11.5313 10.8844 11.3438C10.3156 11.1563 9.6875 11.0625 9 11.0625C8.3125 11.0625 7.68438 11.1563 7.11563 11.3438C6.54688 11.5313 6.20625 11.75 6.09375 12ZM3 9.75C2.5875 9.75 2.23438 9.60313 1.94063 9.30938C1.64688 9.01562 1.5 8.6625 1.5 8.25C1.5 7.825 1.64688 7.46875 1.94063 7.18125C2.23438 6.89375 2.5875 6.75 3 6.75C3.425 6.75 3.78125 6.89375 4.06875 7.18125C4.35625 7.46875 4.5 7.825 4.5 8.25C4.5 8.6625 4.35625 9.01562 4.06875 9.30938C3.78125 9.60313 3.425 9.75 3 9.75ZM15 9.75C14.5875 9.75 14.2344 9.60313 13.9406 9.30938C13.6469 9.01562 13.5 8.6625 13.5 8.25C13.5 7.825 13.6469 7.46875 13.9406 7.18125C14.2344 6.89375 14.5875 6.75 15 6.75C15.425 6.75 15.7813 6.89375 16.0688 7.18125C16.3563 7.46875 16.5 7.825 16.5 8.25C16.5 8.6625 16.3563 9.01562 16.0688 9.30938C15.7813 9.60313 15.425 9.75 15 9.75ZM9 9C8.375 9 7.84375 8.78125 7.40625 8.34375C6.96875 7.90625 6.75 7.375 6.75 6.75C6.75 6.1125 6.96875 5.57812 7.40625 5.14688C7.84375 4.71563 8.375 4.5 9 4.5C9.6375 4.5 10.1719 4.71563 10.6031 5.14688C11.0344 5.57812 11.25 6.1125 11.25 6.75C11.25 7.375 11.0344 7.90625 10.6031 8.34375C10.1719 8.78125 9.6375 9 9 9ZM9 7.5C9.2125 7.5 9.39062 7.42813 9.53438 7.28438C9.67813 7.14062 9.75 6.9625 9.75 6.75C9.75 6.5375 9.67813 6.35938 9.53438 6.21563C9.39062 6.07188 9.2125 6 9 6C8.7875 6 8.60938 6.07188 8.46563 6.21563C8.32188 6.35938 8.25 6.5375 8.25 6.75C8.25 6.9625 8.32188 7.14062 8.46563 7.28438C8.60938 7.42813 8.7875 7.5 9 7.5Z"
                fill="#D9D9D9"
              />
            </svg>
            <p>20 Students</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateCourse({
  handleHeaderTab,
  activeTab,
  isVideoCourse,
  handleReadingType,
  handleVideoType,
}: {
  handleHeaderTab: (tabName: string) => void;
  activeTab: string;
  isVideoCourse: boolean;
  handleReadingType: clickFuncType;
  handleVideoType: clickFuncType;
}) {
  return (
    <div className={styles.createCourse}>
      <div className={styles.createCourseHeader}>
        <div className={styles.createCourseHeaderLeft}>
          <h3>Create New Course</h3>
          <p>Fill in the details below to create your course</p>
        </div>
        <div className={styles.createCourseHeaderRight}>
          <button className={styles.previewBtn}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19Z"
                fill="#434343"
              />
            </svg>
            <span>Preview</span>
          </button>
          <button className={styles.saveDraftBtn}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 7V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H17L21 7ZM12 18C12.8333 18 13.5417 17.7083 14.125 17.125C14.7083 16.5417 15 15.8333 15 15C15 14.1667 14.7083 13.4583 14.125 12.875C13.5417 12.2917 12.8333 12 12 12C11.1667 12 10.4583 12.2917 9.875 12.875C9.29167 13.4583 9 14.1667 9 15C9 15.8333 9.29167 16.5417 9.875 17.125C10.4583 17.7083 11.1667 18 12 18ZM6 10H15V6H6V10Z"
                fill="white"
              />
            </svg>
            <span>Save Draft</span>
          </button>
          <button className={styles.publishBtn}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6 16.6L17.65 9.55L16.25 8.15L10.6 13.8L7.75 10.95L6.35 12.35L10.6 16.6ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
                fill="white"
              />
            </svg>
            <span>Publish</span>
          </button>
        </div>
      </div>
      <div className={styles.createCourseType}>
        <h4>Course Type</h4>
        <div className={styles.createCourseTypeBody}>
          <div
            onClick={handleVideoType}
            className={clsx(
              styles.typeLeft,
              isVideoCourse && styles.isTypeActive
            )}
          >
            <div className={clsx(styles.indicatorBody)}>
              <div
                className={clsx(
                  styles.indicator,
                  isVideoCourse && styles.isIndicatorActive
                )}
              >
                {isVideoCourse && <span></span>}
              </div>
            </div>
            <div className={styles.typeBody}>
              <p className={styles.typeTitle}>Video-based Course</p>
              <p className={styles.typeText}>
                Upload pre-recorded videos and organize them into sections and
                lessons
              </p>
            </div>
          </div>
          <div
            onClick={handleReadingType}
            className={clsx(
              styles.typeRight,
              !isVideoCourse && styles.isTypeActive
            )}
          >
            <div className={clsx(styles.indicatorBody)}>
              <div
                className={clsx(
                  styles.indicator,
                  !isVideoCourse && styles.isIndicatorActive
                )}
              >
                {!isVideoCourse && <span></span>}
              </div>
            </div>
            <div className={styles.typeBody}>
              <p className={styles.typeTitle}>Reading-based Course</p>
              <p className={styles.typeText}>
                Create text based lessons with rich formatting, images and
                attachments
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.createCourseBody}>
        <CreateHeader handleHeaderTab={handleHeaderTab} activeTab={activeTab} />
        {isVideoCourse && <VideoCourse activeTab={activeTab} />}
      </div>
    </div>
  );
}

function CreateHeader({
  handleHeaderTab,
  activeTab,
}: {
  handleHeaderTab: (tabName: string) => void;
  activeTab: string;
}) {
  return (
    <div className={styles.createHeader}>
      {headerTabs.map((item) => (
        <p
          onClick={() => handleHeaderTab(item)}
          className={clsx(activeTab === item ? styles.activeTab : "")}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function VideoCourse({ activeTab }: { activeTab: string }) {
  return (
    <div className={styles.videoCourse}>
      {activeTab === "Course Details" && <VideoFormDetails />}
    </div>
  );
}

function VideoFormDetails() {
  return (
    <form method="post">
      <div className={styles.videoForm}>
        <div className={styles.videoFormLeft}>left</div>
        <div className={styles.videoFormRight}>right</div>
      </div>
    </form>
  );
}
