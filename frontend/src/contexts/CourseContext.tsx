import { createContext, ReactNode, useState } from "react";

type videoCourseSectionsType = {
  id: number;
  sectionTitle: string;
  lessons: {
    id: number;
    lessonVideo: File;
    lessonFileUrl: { url: string; public_id: string; fileType: string };
    lessonTitle: string;
    lessonDescription: string;
  }[];
}[];

type courseFormType = {
  courseTitle: string;
  courseDescription: string;
  courseCategory: string;
  courseDifficulty: string;
  prerequisites: { id: number; value: string }[];
  objectives: { id: number; value: string }[];
  duration: number;
  courseImage: File | null;
  courseSections: videoCourseSectionsType;
  metaTitle: string;
  metaDescription: string;
  visibility: string;
  instructorDisplayName: string;
  instructorBio: string;
};

const initialCourseForm = {
  courseTitle: "",
  courseDescription: "",
  courseCategory: "",
  courseDifficulty: "",
  prerequisites: [],
  objectives: [],
  duration: 0,
  courseImage: null,
  courseSections: [],
  metaTitle: "",
  metaDescription: "",
  visibility: "public",
  instructorDisplayName: "",
  instructorBio: "",
};

type CourseContextType = {
  courseForm: courseFormType;
  setCourseForm: React.Dispatch<React.SetStateAction<courseFormType>>;
  objectives: { id: number; value: string }[];
  setObjectives: React.Dispatch<
    React.SetStateAction<{ id: number; value: string }[]>
  >;
  prerequisites: { id: number; value: string }[];
  setPrerequisites: React.Dispatch<
    React.SetStateAction<{ id: number; value: string }[]>
  >;
  showAddSectionForm: boolean;
  setShowAddSectionForm: React.Dispatch<React.SetStateAction<boolean>>;
  showAddLessonForm: boolean;
  setShowAddLessonForm: React.Dispatch<React.SetStateAction<boolean>>;
  videoCourseSections: videoCourseSectionsType;
  setVideoCourseSections: React.Dispatch<
    React.SetStateAction<videoCourseSectionsType>
  >;
  currentSection: number | null;
  setCurrentSection: React.Dispatch<React.SetStateAction<number | null>>;
};

export const CourseContext = createContext<CourseContextType | undefined>(
  undefined
);

function CourseContextProvider({ children }: { children: ReactNode }) {
  const [objectives, setObjectives] = useState<{ id: number; value: string }[]>(
    []
  );
  const [prerequisites, setPrerequisites] = useState<
    { id: number; value: string }[]
  >([]);
  const [videoCourseSections, setVideoCourseSections] =
    useState<videoCourseSectionsType>([]);

  const [showAddSectionForm, setShowAddSectionForm] = useState<boolean>(false);
  const [showAddLessonForm, setShowAddLessonForm] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const [courseForm, setCourseForm] =
    useState<courseFormType>(initialCourseForm);

  return (
    <CourseContext.Provider
      value={{
        courseForm,
        setCourseForm,
        currentSection,
        setCurrentSection,
        videoCourseSections,
        setVideoCourseSections,
        objectives,
        setObjectives,
        prerequisites,
        setPrerequisites,
        showAddSectionForm,
        setShowAddSectionForm,
        showAddLessonForm,
        setShowAddLessonForm,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContextProvider;
