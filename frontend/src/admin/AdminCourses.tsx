import React, {
  act,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import instructorImage from "../assets/images/instructor02.jpg";
import styles from "./AdminCourses.module.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import clsx from "clsx";
import courseImage1 from "../assets/images/course-1.jpg";
import useCourseStore from "../stores/courseStore";
import CourseContextProvider, {
  CourseContext,
} from "../contexts/CourseContext";
import thumbnailImage from "../assets/images/thumbnail.jpg";
import { log } from "console";

type clickFuncType = () => void;
type EventChangeType = (
  e: React.ChangeEvent<HTMLInputElement>,
  id?: number
) => void;

const headerTabs: string[] = [
  "Course Details",
  "Course Content",
  "Pricing & Access",
  "Settings",
];

export default function AdminCoursesProv() {
  return (
    <CourseContextProvider>
      <AdminCourses />
    </CourseContextProvider>
  );
}

function AdminCourses() {
  const [isCreateCourse, setIsCreateCourse] = useState<boolean>(false);
  const [isVideoCourse, setIsVideoCourse] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("Course Details");

  //getting course context
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const showAddSectionForm = context?.showAddSectionForm;
  const showAddLessonForm = context?.showAddLessonForm;
  const setShowAddSectionForm = context?.setShowAddSectionForm;

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
  // console.log(courseForm);

  return (
    <div className={styles.adminCourses}>
      <div className={clsx(showAddSectionForm && styles.dimPage)}></div>
      <div className={clsx(showAddLessonForm && styles.dimPage)}></div>
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
                key={i}
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
  const { uploadCourse, getSignedUrl } = useCourseStore();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;

  const handlePublishCourse = async () => {
    if (courseForm) {
      const res = await uploadCourse(courseForm, setUploadProgress);
      console.log("published");
    }
  };

  const handleSaveDraft = async () => {
    const publicId =
      courseForm?.courseSections[0].lessons[0].lessonFileUrl.public_id;
    if (publicId) {
      const res = await getSignedUrl(publicId, "video");
      setSignedUrl(res);
      // console.log(signedUrl);

      if (res) {
        window.open(res, "_blank");
      } else {
        console.warn("signedUrl is null, cannot open window.");
      }
    } else {
      console.warn("publicId is undefined, cannot get signed URL.");
    }
  };

  //checking if all forms filled
  const isFormFilled =
    courseForm?.courseTitle &&
    courseForm?.courseDescription &&
    courseForm?.courseCategory &&
    courseForm?.courseDifficulty &&
    courseForm?.duration > 0 &&
    courseForm?.instructorDisplayName &&
    courseForm?.instructorBio &&
    courseForm?.courseSections.length > 0 &&
    courseForm?.metaTitle &&
    courseForm?.metaDescription &&
    courseForm?.visibility &&
    courseForm?.courseImage &&
    courseForm?.objectives.length > 0 &&
    courseForm?.prerequisites.length > 0
      ? true
      : false;

  // console.log(isFormFilled);

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
          <button onClick={handleSaveDraft} className={styles.saveDraftBtn}>
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
          <button
            style={{
              opacity: isFormFilled ? 1 : 0.6,
              pointerEvents: isFormFilled ? "auto" : "none",
              cursor: isFormFilled ? "pointer" : "not-allowed",
            }}
            onClick={handlePublishCourse}
            className={styles.publishBtn}
          >
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
          key={item}
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
      {activeTab === "Course Content" && <VideoFormContent />}
      {activeTab === "Settings" && <CourseFormSettings />}
    </div>
  );
}

function CourseFormSettings() {
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const setCourseForm = context?.setCourseForm;

  const handleFormInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    if (setCourseForm) {
      setCourseForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div className={clsx(styles.courseSettings)}>
      <div className={clsx(styles.courseSettingsLeft)}>
        <div className={styles.seoFormTitle}>
          <h3>SEO Settings</h3>
        </div>
        <div className={clsx(styles.seoFormBody)}>
          <form method="post">
            <div className={styles.metaTitleInput}>
              <label htmlFor="metaTitle">Meta Title</label>
              <input
                onChange={handleFormInput}
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={courseForm?.metaTitle}
                placeholder="SEO title for your course"
              />
            </div>
            <div className={styles.metaDescriptionInput}>
              <label htmlFor="metaDescription">Meta Description</label>
              <textarea
                onChange={handleFormInput}
                name="metaDescription"
                id="metaDescription"
                value={courseForm?.metaDescription}
                placeholder="Brief description for search engines"
              ></textarea>
            </div>
          </form>
        </div>
        <div className={styles.visibilityTitle}>
          <h3>Course Visibility</h3>
          <p>Control who can see and enroll in your course</p>
        </div>
        <div className={styles.visibilityInput}>
          <select
            name="visibility"
            id="visibility"
            onChange={handleFormInput}
            value={courseForm?.visibility}
          >
            <option value="public">Published (Public)</option>
            <option value="members">Members Only</option>
          </select>
        </div>
      </div>
      <div className={clsx(styles.courseSettingsRight)}>
        <div className={styles.instructorInformationTitle}>
          <h3>Instructor Information</h3>
        </div>
        <div className={clsx(styles.instructorInformationBody)}>
          <div className={clsx(styles.instructorProfile)}>
            <div className={clsx(styles.instructorProfileLeft)}>
              <img src={instructorImage} alt="instructorImage" />
            </div>
            <div className={clsx(styles.instructorProfileRight)}>
              <h2>John Doe</h2>
              <p>Senior Instructor</p>
            </div>
          </div>
          <div className={styles.instructorForm}>
            <form method="post">
              <div className={styles.displayNameInput}>
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  placeholder="Name to display on course"
                  name="instructorDisplayName"
                  onChange={handleFormInput}
                  value={courseForm?.instructorDisplayName}
                />
              </div>
              <div className={styles.bioForCourseInput}>
                <label htmlFor="bioForCourse">Bio for this Course</label>
                <textarea
                  name="instructorBio"
                  value={courseForm?.instructorBio}
                  onChange={handleFormInput}
                  id="bioForCourse"
                  placeholder="Your Expertise in this Course"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoFormDetails() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageInputText, setImageInputText] = useState<string>("Upload Image");
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const setCourseForm = context?.setCourseForm;
  // const handleImageInputChange: EventChangeType = (e) => {
  //   const files = imageInputRef.current?.files;
  //   setImageInputText(
  //     files && files.length > 0 ? files[0].name : "Upload Image"
  //   );
  // };
  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const files = imageInputRef.current?.files;
    setImageInputText(
      files && files.length > 0 ? files[0].name : "Upload Image"
    );
    if (setCourseForm) {
      const { name, value, type, files } = e.target as HTMLInputElement;
      setCourseForm((prev) => ({
        ...prev,
        [name]:
          type === "file"
            ? files && files.length > 0
              ? files[0]
              : null
            : value,
      }));
    }
  };
  // console.log(courseForm);
  return (
    <form method="post">
      <div className={styles.videoForm}>
        <div className={styles.videoFormLeft}>
          <div className={styles.titleInput}>
            <label htmlFor="courseTitle">Course Title:</label>
            <input
              type="text"
              name="courseTitle"
              id="courseTitle"
              placeholder="Enter course title..."
              value={courseForm?.courseTitle}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.descriptionInput}>
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              name="courseDescription"
              value={courseForm?.courseDescription}
              id="courseDescription"
              placeholder="Describe what students will learn in this course"
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className={styles.courseCategoryAndDifficulty}>
            <div className={styles.courseCategory}>
              <label htmlFor="courseCategory">Category</label>
              <select
                id="courseCategory"
                name="courseCategory"
                onChange={handleOnChange}
                value={courseForm?.courseCategory}
              >
                <option value="select">Select a Category</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Design & Graphics">Design</option>
                <option value="Business & Marketing">
                  Business & Marketing
                </option>
                <option value="Music">Music</option>
                <option value="G.E.S.">G.E.S.</option>
              </select>
            </div>
            <div className={styles.courseDifficulty}>
              <label htmlFor="courseDifficulty">Difficulty</label>
              <select
                id="courseDifficulty"
                name="courseDifficulty"
                onChange={handleOnChange}
                value={courseForm?.courseDifficulty}
              >
                <option value="select">Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <ReuseInputComp
            title="Learning Objectives"
            placeholder="What will students learn?"
            btnText="Add Learning Objective"
            btnType="objective"
          />
          <ReuseInputComp
            title="Prerequisites"
            placeholder="What should students know before enrolling?"
            btnText="Add Prerequisite"
            btnType="prerequisite"
          />
        </div>
        <div className={styles.videoFormRight}>
          <div className={styles.thumbnail}>
            <p>Course Thumbnail</p>
            <div className={styles.thumbnailInput}>
              <img src={thumbnailImage} alt="thumbnail" />
              <label htmlFor="thumbnail">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                    fill="#434343"
                  />
                </svg>
                {imageInputText}
              </label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                name="courseImage"
                id="thumbnail"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className={styles.courseDuration}>
            <label htmlFor="duration">Course Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              id="duration"
              placeholder="Duration in minutes"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function VideoFormContent() {
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const showAddSectionForm = context?.showAddSectionForm;
  const setShowAddSectionForm = context?.setShowAddSectionForm;
  const showAddLessonForm = context?.showAddLessonForm;
  const videoCourseSections = context?.videoCourseSections;
  const handleOpenAddSectionFormBtn = () => {
    if (setShowAddSectionForm) {
      setShowAddSectionForm(true);
    }
  };

  const handleCloseAddSectionFormBtn = () => {
    if (setShowAddSectionForm) {
      setShowAddSectionForm(false);
    }
  };

  return (
    <div className={styles.videoContent}>
      {showAddSectionForm && (
        <AddSectionForm
          handleCloseAddSectionFormBtn={handleCloseAddSectionFormBtn}
        />
      )}
      {showAddLessonForm && <AddLessonForm />}
      <div className={styles.videoContentHeader}>
        <h3>Course Structure</h3>
        <button
          onClick={handleOpenAddSectionFormBtn}
          className={styles.addSectionBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Add Section
        </button>
      </div>
      <div className={styles.videoContentBody}>
        <form>
          {courseForm?.courseSections?.map((item, index) => (
            <Section
              sectionNumber={index + 1}
              sectionTitle={item.sectionTitle}
              id={item.id}
              lessons={item.lessons}
              key={item.id}
            />
          ))}
        </form>
      </div>
    </div>
  );
}

function AddLessonForm() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [lessonFormData, setLessonFormData] = useState<{
    lessonTitle: string;
    lessonDescription: string;
    lessonVideo: File | null;
  }>({ lessonTitle: "", lessonDescription: "", lessonVideo: null });
  const [videoFileName, setVideoFileName] = useState<string | null>(null);

  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const setCourseForm = context?.setCourseForm;
  const setShowAddLessonForm = context?.setShowAddLessonForm;
  const videoCourseSections = context?.videoCourseSections;
  const setVideoCourseSections = context?.setVideoCourseSections;
  const currentSection = context?.currentSection;
  const { uploadCoursePdf, uploadCourseVideo } = useCourseStore();

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, files, value } = e.target as HTMLInputElement;
    setLessonFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    }));
    files && setVideoFileName(files[0].name);
    // console.log(e.target.name);
  };

  const handleCloseAddLessonForm = () => {
    if (setShowAddLessonForm) {
      setShowAddLessonForm(false);
    }
  };

  const handleAddLesson: clickFuncType = async () => {
    if (
      setShowAddLessonForm &&
      setVideoCourseSections &&
      videoCourseSections &&
      currentSection &&
      lessonFormData &&
      courseForm &&
      setCourseForm
    ) {
      //set isLoading to true
      setIsUploading(true);
      //declare newLesson object variable
      let res;

      //first upload lesson file to cloudinary
      if (lessonFormData?.lessonVideo?.type === "application/pdf") {
        res = await uploadCoursePdf(
          lessonFormData?.lessonVideo,
          setUploadProgress
        );
      }
      if (lessonFormData?.lessonVideo?.type.startsWith("video")) {
        res = await uploadCourseVideo(
          lessonFormData?.lessonVideo,
          setUploadProgress
        );
      }

      const section = courseForm.courseSections.find(
        (item) => item.id === currentSection
      );

      const newLesson = {
        id: section ? section.lessons.length + 1 : 1,
        lessonTitle: lessonFormData.lessonTitle,
        lessonDescription: lessonFormData.lessonDescription,
        lessonVideo: lessonFormData.lessonVideo as File, // ensure not null
        lessonFileUrl: {
          url: res?.url ?? "",
          public_id: res?.public_id ?? "",
          fileType: res?.resource_type ?? "",
        },
      };

      const newSections = courseForm.courseSections.map((item) =>
        item.id === currentSection
          ? { ...item, lessons: [...item.lessons, newLesson] }
          : item
      );
      setCourseForm((prev) => ({
        ...prev,
        courseSections: newSections,
      }));
      setShowAddLessonForm(false);
      // console.log(courseForm);
    }
  };

  return (
    <div className={styles.addLessonForm}>
      <div className={styles.addLessonFormHeader}>
        <p>Add New Lesson</p>
        <svg
          onClick={handleCloseAddLessonForm}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
      <div className={styles.addLessonFormBody}>
        <div className={styles.lessonTitle}>
          <label htmlFor="lessonTitle">Lesson Title</label>
          <input
            onChange={handleFormInput}
            value={lessonFormData.lessonTitle}
            type="text"
            name="lessonTitle"
            id="lessonTitle"
            placeholder="Enter lesson title..."
          />
        </div>
        <div className={styles.lessonDescription}>
          <label htmlFor="lessonDescription">Lesson Description</label>
          <textarea
            name="lessonDescription"
            onChange={handleFormInput}
            value={lessonFormData.lessonDescription}
            id="lessonDescription"
            placeholder="Short Description for this lesson..."
          ></textarea>
        </div>
        <div className={styles.lessonUpload}>
          <h3 className={styles.lessonUploadTitle}>Upload Lesson Video/PDF</h3>
          <div className={styles.lessonUploadBody}>
            <div className={styles.lessonUploadBodyTop}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 -960 960 960"
                width="100px"
                fill="#d9d9d9"
              >
                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
              </svg>
            </div>
            <div className={styles.lessonUploadBodyMiddle}>
              <p>Drag and drop file here</p>
              <span>or</span>
            </div>
            <div className={styles.lessonUploadBodyBottom}>
              {!isUploading && (
                <label htmlFor="lessonVideo">
                  {videoFileName
                    ? videoFileName.length > 20
                      ? `${videoFileName.slice(0, 20)}...`
                      : videoFileName
                    : "Browse files"}
                </label>
              )}
              {/* /* // Simple progress bar */}
              {isUploading && (
                <div
                  style={{
                    width: "100%",
                    height: "20px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      height: "100%",
                      backgroundColor: "#3B82F6",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              )}
              <input
                onChange={handleFormInput}
                type="file"
                accept="video/*, application/pdf"
                name="lessonVideo"
                id="lessonVideo"
              />
              <p>Supported formats: MP4, MOV, AVI, WMV (Max Size: 2GB)</p>
            </div>
          </div>
        </div>
        <div className={styles.addLessonBtn}>
          <button
            disabled={!lessonFormData.lessonVideo || isUploading}
            onClick={handleAddLesson}
          >
            {isUploading ? `Uploading: ${uploadProgress}` : "Add Lesson"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddSectionForm({
  handleCloseAddSectionFormBtn,
}: {
  handleCloseAddSectionFormBtn: () => void;
}) {
  const [sectionTitle, setSectionTitle] = useState<string>("");

  const context = useContext(CourseContext);
  const setVideoCourseSections = context?.setVideoCourseSections;
  const setCourseForm = context?.setCourseForm;
  const courseForm = context?.courseForm;
  const setShowAddSectionForm = context?.setShowAddSectionForm;

  const handleSectionTitleInput: EventChangeType = (e) => {
    setSectionTitle(e.target.value);
  };

  const handleAddSection = () => {
    if (setShowAddSectionForm && setCourseForm && sectionTitle) {
      setCourseForm((prev) => ({
        ...prev,
        courseSections: [
          ...prev.courseSections,
          {
            id: prev.courseSections.length + 1,
            sectionTitle: sectionTitle,
            lessons: [],
          },
        ],
      }));
      setShowAddSectionForm(false);
    }
  };
  // console.log(courseForm);
  return (
    <div className={styles.addSectionForm}>
      <div className={styles.addSectionFormHeader}>
        <p>Add New Section</p>
        <svg
          onClick={handleCloseAddSectionFormBtn}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
      <div className={styles.addSectionFormBody}>
        <label htmlFor="sectionTitle">Section Title</label>
        <input
          value={sectionTitle}
          onChange={handleSectionTitleInput}
          type="text"
          id="sectionTitle"
          placeholder="Enter Section Title"
        />
        <div className={styles.addSectionButton}>
          <button onClick={handleAddSection}>Add Section</button>
        </div>
      </div>
    </div>
  );
}

function Section({
  sectionNumber,
  sectionTitle,
  lessons,
  id,
}: {
  sectionNumber: number;
  sectionTitle: string;
  id: number;
  lessons: {
    id: number;
    lessonTitle: string;
    lessonVideo: File;
    lessonDescription: string;
  }[];
}) {
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const setCourseForm = context?.setCourseForm;
  const setShowAddLessonForm = context?.setShowAddLessonForm;
  const setCurrentSection = context?.setCurrentSection;
  const videoCourseSections = context?.videoCourseSections;
  const setVideoCourseSections = context?.setVideoCourseSections;

  const handleOpenAddLessonFormBtn = () => {
    if (setShowAddLessonForm && setCurrentSection) {
      setShowAddLessonForm(true);
      setCurrentSection(id);
    }
  };

  const handleDeleteCourseSection: (id: number) => void = (id: number) => {
    if (courseForm && setCourseForm) {
      const filtedSections = courseForm.courseSections.filter(
        (section) => section.id !== id
      );

      setCourseForm((prev) => ({
        ...prev,
        courseSections: filtedSections,
      }));
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionTop}>
        <div className={styles.sectionTopLeft}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 20C8.45 20 7.97917 19.8042 7.5875 19.4125C7.19583 19.0208 7 18.55 7 18C7 17.45 7.19583 16.9792 7.5875 16.5875C7.97917 16.1958 8.45 16 9 16C9.55 16 10.0208 16.1958 10.4125 16.5875C10.8042 16.9792 11 17.45 11 18C11 18.55 10.8042 19.0208 10.4125 19.4125C10.0208 19.8042 9.55 20 9 20ZM15 20C14.45 20 13.9792 19.8042 13.5875 19.4125C13.1958 19.0208 13 18.55 13 18C13 17.45 13.1958 16.9792 13.5875 16.5875C13.9792 16.1958 14.45 16 15 16C15.55 16 16.0208 16.1958 16.4125 16.5875C16.8042 16.9792 17 17.45 17 18C17 18.55 16.8042 19.0208 16.4125 19.4125C16.0208 19.8042 15.55 20 15 20ZM9 14C8.45 14 7.97917 13.8042 7.5875 13.4125C7.19583 13.0208 7 12.55 7 12C7 11.45 7.19583 10.9792 7.5875 10.5875C7.97917 10.1958 8.45 10 9 10C9.55 10 10.0208 10.1958 10.4125 10.5875C10.8042 10.9792 11 11.45 11 12C11 12.55 10.8042 13.0208 10.4125 13.4125C10.0208 13.8042 9.55 14 9 14ZM15 14C14.45 14 13.9792 13.8042 13.5875 13.4125C13.1958 13.0208 13 12.55 13 12C13 11.45 13.1958 10.9792 13.5875 10.5875C13.9792 10.1958 14.45 10 15 10C15.55 10 16.0208 10.1958 16.4125 10.5875C16.8042 10.9792 17 11.45 17 12C17 12.55 16.8042 13.0208 16.4125 13.4125C16.0208 13.8042 15.55 14 15 14ZM9 8C8.45 8 7.97917 7.80417 7.5875 7.4125C7.19583 7.02083 7 6.55 7 6C7 5.45 7.19583 4.97917 7.5875 4.5875C7.97917 4.19583 8.45 4 9 4C9.55 4 10.0208 4.19583 10.4125 4.5875C10.8042 4.97917 11 5.45 11 6C11 6.55 10.8042 7.02083 10.4125 7.4125C10.0208 7.80417 9.55 8 9 8ZM15 8C14.45 8 13.9792 7.80417 13.5875 7.4125C13.1958 7.02083 13 6.55 13 6C13 5.45 13.1958 4.97917 13.5875 4.5875C13.9792 4.19583 14.45 4 15 4C15.55 4 16.0208 4.19583 16.4125 4.5875C16.8042 4.97917 17 5.45 17 6C17 6.55 16.8042 7.02083 16.4125 7.4125C16.0208 7.80417 15.55 8 15 8Z"
              fill="#434343"
            />
          </svg>
          <p>
            Section {sectionNumber}: {sectionTitle}
          </p>
        </div>
        <div className={styles.sectionTopRight}>
          <svg
            className={styles.headerEditSvg}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 21C4.45 21 3.97917 20.8041 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V4.99998C3 4.44998 3.19583 3.97914 3.5875 3.58748C3.97917 3.19581 4.45 2.99998 5 2.99998H13.925L11.925 4.99998H5V19H19V12.05L21 10.05V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8041 19.55 21 19 21H5ZM9 15V10.75L18.175 1.57498C18.375 1.37498 18.6 1.22498 18.85 1.12498C19.1 1.02498 19.35 0.974976 19.6 0.974976C19.8667 0.974976 20.1208 1.02498 20.3625 1.12498C20.6042 1.22498 20.825 1.37498 21.025 1.57498L22.425 2.99998C22.6083 3.19998 22.75 3.42081 22.85 3.66248C22.95 3.90414 23 4.14998 23 4.39998C23 4.64998 22.9542 4.89581 22.8625 5.13748C22.7708 5.37914 22.625 5.59998 22.425 5.79998L13.25 15H9ZM11 13H12.4L18.2 7.19998L17.5 6.49998L16.775 5.79998L11 11.575V13Z"
              fill="#434343"
            />
          </svg>
          <svg
            onClick={() => handleDeleteCourseSection(id)}
            className={styles.headerDeleteSvg}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
              fill="#434343"
            />
          </svg>
          <svg
            className={styles.headerDropDownSvg}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z"
              fill="#434343"
            />
          </svg>
        </div>
      </div>
      <div className={styles.sectionMiddle}>
        {lessons.map((item, index) => (
          <Lesson id={item.id} key={item.id} lessonTitle={item.lessonTitle} />
        ))}
        {/* <Lesson />
        <Lesson /> */}
      </div>
      <div
        role="button"
        onClick={handleOpenAddLessonFormBtn}
        className={styles.sectionBottom}
      >
        <p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
              fill="#535AE5"
            />
          </svg>
          Add Lesson
        </p>
      </div>
    </div>
  );
}

function Lesson({ id, lessonTitle }: { id: number; lessonTitle: string }) {
  const context = useContext(CourseContext);
  const courseForm = context?.courseForm;
  const setCourseForm = context?.setCourseForm;
  const currentSection = context?.currentSection;
  const videoCourseSections = context?.videoCourseSections;
  const setVideoCourseSections = context?.setVideoCourseSections;

  const handleDeleteCourseLesson: (id: number) => void = (id) => {
    if (currentSection && courseForm && setCourseForm) {
      const section = courseForm.courseSections.find(
        (item) => item.id === currentSection
      );

      // Ensure filteredSectionLessons is always an array
      const filteredSectionLessons =
        section?.lessons.filter((item) => item.id !== id) ?? [];

      const newSections = courseForm.courseSections.map((item) =>
        item.id === currentSection
          ? { ...item, lessons: filteredSectionLessons }
          : item
      );
      setCourseForm((prev) => ({
        ...prev,
        courseSections: newSections,
      }));
    }
  };

  return (
    <div className={styles.lesson}>
      <div className={styles.lessonLeft}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 20C8.45 20 7.97917 19.8042 7.5875 19.4125C7.19583 19.0208 7 18.55 7 18C7 17.45 7.19583 16.9792 7.5875 16.5875C7.97917 16.1958 8.45 16 9 16C9.55 16 10.0208 16.1958 10.4125 16.5875C10.8042 16.9792 11 17.45 11 18C11 18.55 10.8042 19.0208 10.4125 19.4125C10.0208 19.8042 9.55 20 9 20ZM15 20C14.45 20 13.9792 19.8042 13.5875 19.4125C13.1958 19.0208 13 18.55 13 18C13 17.45 13.1958 16.9792 13.5875 16.5875C13.9792 16.1958 14.45 16 15 16C15.55 16 16.0208 16.1958 16.4125 16.5875C16.8042 16.9792 17 17.45 17 18C17 18.55 16.8042 19.0208 16.4125 19.4125C16.0208 19.8042 15.55 20 15 20ZM9 14C8.45 14 7.97917 13.8042 7.5875 13.4125C7.19583 13.0208 7 12.55 7 12C7 11.45 7.19583 10.9792 7.5875 10.5875C7.97917 10.1958 8.45 10 9 10C9.55 10 10.0208 10.1958 10.4125 10.5875C10.8042 10.9792 11 11.45 11 12C11 12.55 10.8042 13.0208 10.4125 13.4125C10.0208 13.8042 9.55 14 9 14ZM15 14C14.45 14 13.9792 13.8042 13.5875 13.4125C13.1958 13.0208 13 12.55 13 12C13 11.45 13.1958 10.9792 13.5875 10.5875C13.9792 10.1958 14.45 10 15 10C15.55 10 16.0208 10.1958 16.4125 10.5875C16.8042 10.9792 17 11.45 17 12C17 12.55 16.8042 13.0208 16.4125 13.4125C16.0208 13.8042 15.55 14 15 14ZM9 8C8.45 8 7.97917 7.80417 7.5875 7.4125C7.19583 7.02083 7 6.55 7 6C7 5.45 7.19583 4.97917 7.5875 4.5875C7.97917 4.19583 8.45 4 9 4C9.55 4 10.0208 4.19583 10.4125 4.5875C10.8042 4.97917 11 5.45 11 6C11 6.55 10.8042 7.02083 10.4125 7.4125C10.0208 7.80417 9.55 8 9 8ZM15 8C14.45 8 13.9792 7.80417 13.5875 7.4125C13.1958 7.02083 13 6.55 13 6C13 5.45 13.1958 4.97917 13.5875 4.5875C13.9792 4.19583 14.45 4 15 4C15.55 4 16.0208 4.19583 16.4125 4.5875C16.8042 4.97917 17 5.45 17 6C17 6.55 16.8042 7.02083 16.4125 7.4125C16.0208 7.80417 15.55 8 15 8Z"
            fill="#9D9D9D"
          />
        </svg>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L22 6.5V17.5L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4Z"
            fill="#1680D7"
          />
        </svg>
        <p>{lessonTitle}</p>
      </div>
      <div className={styles.lessonRight}>
        <p>5:30</p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 21C4.45 21 3.97917 20.8041 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V4.99998C3 4.44998 3.19583 3.97914 3.5875 3.58748C3.97917 3.19581 4.45 2.99998 5 2.99998H13.925L11.925 4.99998H5V19H19V12.05L21 10.05V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8041 19.55 21 19 21H5ZM9 15V10.75L18.175 1.57498C18.375 1.37498 18.6 1.22498 18.85 1.12498C19.1 1.02498 19.35 0.974976 19.6 0.974976C19.8667 0.974976 20.1208 1.02498 20.3625 1.12498C20.6042 1.22498 20.825 1.37498 21.025 1.57498L22.425 2.99998C22.6083 3.19998 22.75 3.42081 22.85 3.66248C22.95 3.90414 23 4.14998 23 4.39998C23 4.64998 22.9542 4.89581 22.8625 5.13748C22.7708 5.37914 22.625 5.59998 22.425 5.79998L13.25 15H9ZM11 13H12.4L18.2 7.19998L17.5 6.49998L16.775 5.79998L11 11.575V13Z"
            fill="#434343"
          />
        </svg>
        <svg
          onClick={() => handleDeleteCourseLesson(id)}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
            fill="#434343"
          />
        </svg>
      </div>
    </div>
  );
}

function ReuseInputComp({
  title,
  placeholder,
  btnText,
  btnType,
}: {
  title: string;
  placeholder: string;
  btnText: string;
  btnType: string;
}) {
  const courseContext = useContext(CourseContext);
  const objectives = courseContext?.courseForm.objectives;
  const setCourseForm = courseContext?.setCourseForm;
  const prerequisites = courseContext?.courseForm.prerequisites;

  // console.log(objectives);

  const handleObjectiveInput: EventChangeType = (e, id) => {
    if (setCourseForm && typeof id === "number") {
      let updatedObjectives = (objectives ?? []).map((item) =>
        item.id === id ? { ...item, value: e.target.value } : item
      );

      setCourseForm((prev) => ({ ...prev, objectives: updatedObjectives }));
      // console.log(typeof id);
    }
  };

  const handleDeleteObjective: (id: number) => void = (id) => {
    if (setCourseForm) {
      let updatedObjectives = (objectives ?? []).filter(
        (item) => item.id !== id
      );

      setCourseForm((prev) => ({
        ...prev,
        objectives: updatedObjectives,
      }));
    }
  };
  // console.log(objectives);

  const handlePrerequisiteInput: EventChangeType = (e, id) => {
    if (setCourseForm && typeof id === "number") {
      let updatedPrerequisites = (prerequisites ?? []).map((item) =>
        item.id === id ? { ...item, value: e.target.value } : item
      );

      setCourseForm((prev) => ({
        ...prev,
        prerequisites: updatedPrerequisites,
      }));
      // console.log(typeof id);
    }
  };

  const handleDeletePrerequisite: (id: number) => void = (id) => {
    if (setCourseForm) {
      let updatedPrerequisites = (prerequisites ?? []).filter(
        (item) => item.id !== id
      );

      setCourseForm((prev) => ({
        ...prev,
        prerequisites: updatedPrerequisites,
      }));
    }
  };
  // console.log(prerequisites);

  const handleAddObjective: clickFuncType = () => {
    if (setCourseForm) {
      setCourseForm((prev) => ({
        ...prev,
        objectives: [
          ...prev.objectives,
          { id: prev.objectives.length + 1, value: "" },
        ],
      }));
    }
  };

  const handleAddPrerequisite: clickFuncType = () => {
    if (setCourseForm) {
      setCourseForm((prev) => ({
        ...prev,
        prerequisites: [
          ...prev.prerequisites,
          { id: prev.prerequisites.length + 1, value: "" },
        ],
      }));
    }
  };

  return (
    <div className={styles.courseObjectives}>
      <p>{title}</p>
      {btnType === "objective" &&
        objectives?.map((item) => (
          <div key={item.id} className={styles.courseObjectivesInput}>
            <input
              onChange={(e) => handleObjectiveInput(e, item.id)}
              type="text"
              name="courseObjective"
              id="courseObjective"
              value={item.value}
              placeholder={placeholder}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
              onClick={() => handleDeleteObjective(item.id)}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        ))}
      {btnType === "prerequisite" &&
        prerequisites?.map((item) => (
          <div key={item.id} className={styles.courseObjectivesInput}>
            <input
              type="text"
              onChange={(e) => handlePrerequisiteInput(e, item.id)}
              name="courseObjective"
              id="courseObjective"
              value={item.value}
              placeholder={placeholder}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
              onClick={() => handleDeletePrerequisite(item.id)}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        ))}
      <p
        className={styles.addObjectiveBtn}
        onClick={
          btnType === "objective" ? handleAddObjective : handleAddPrerequisite
        }
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </span>{" "}
        {btnText}
      </p>
    </div>
  );
}
