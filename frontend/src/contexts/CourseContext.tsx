import { createContext, ReactNode, useState } from "react";

type CourseContextType = {
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
};

export const CourseContext = createContext<CourseContextType | undefined>(
  undefined
);

function CourseContextProvider({ children }: { children: ReactNode }) {
  const [objectives, setObjectives] = useState<{ id: number; value: string }[]>(
    [{ id: 1, value: "" }]
  );
  const [prerequisites, setPrerequisites] = useState<
    { id: number; value: string }[]
  >([{ id: 1, value: "" }]);

  const [showAddSectionForm, setShowAddSectionForm] = useState<boolean>(false);

  return (
    <CourseContext.Provider
      value={{
        objectives,
        setObjectives,
        prerequisites,
        setPrerequisites,
        showAddSectionForm,
        setShowAddSectionForm,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContextProvider;
