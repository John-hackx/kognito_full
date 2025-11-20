import axios from "axios";
import { create } from "zustand";

//base Url backend
export const baseURL = "http://localhost:5000"; // For local development
// export const baseURL = "https://kognito-full.onrender.com"; // Use this for production

// Define types for uploaded assets
interface UploadedVideo {
  url: string;
  duration: number;
  size: number;
  public_id: string;
  resource_type: string;
}

interface UploadPdf {
  url: string;
  public_id: string;
  resource_type: string;
}

// Define the shape of your store's state and actions
interface CourseStore {
  courses: any[]; // You can replace `any` with a Course type if available
  isLoading: boolean;
  error: string | null;
  signedUrl: string | null;
  createdCourse: any;

  // State setters
  setError: (errorValue: string | null) => void;
  setLoading: (loadingState: boolean) => void;

  // Async actions
  uploadCourseImage: (
    courseImage: File,
    setUploadProgress: any
  ) => Promise<string>;
  uploadCourseVideo: (
    courseVideo: File,
    setUploadProgress: any
  ) => Promise<UploadedVideo>;
  uploadCoursePdf: (
    coursePdf: File,
    setUploadProgress: any
  ) => Promise<UploadPdf>;
  uploadCourse: (courseForm: any, setUploadProgress: any) => Promise<any>;
  getSignedUrl: (publicId: string, resource_type: string) => Promise<any>;
}
const env = (import.meta as any).env;

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  createdCourse: null,
  isLoading: false,
  error: null,
  signedUrl: null,

  setError: (errorValue) => set({ error: errorValue }),
  setLoading: (loadingState) => set({ isLoading: loadingState }),

  uploadCourseImage: async (courseImage, setUploadProgress) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", courseImage);
      formData.append("upload_preset", "public_upload_preset");
      formData.append("folder", "public_media/course_images");

      const res = await axios.post(CLOUDINARY_URL, formData, {
        withCredentials: false,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted);
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });
      set({ isLoading: false });
      return res.data.secure_url as string;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      set({ error: `Error uploading image: ${error.message}` });
      throw error;
    }
  },

  uploadCourseVideo: async (courseVideo, setUploadProgress) => {
    set({ isLoading: true, error: null });
    try {
      //Get signed params from backend
      const res1 = await axios.post(
        `${baseURL}/api/courses/upload/signed`,
        {
          folder: "private_media/course_videos",
          resource_type: "video",
        },
        { withCredentials: true }
      );

      //Upload video using signed credentials
      const formData = new FormData();
      formData.append("file", courseVideo);
      formData.append("timestamp", res1.data.timestamp);
      formData.append("signature", res1.data.signature);
      formData.append("api_key", res1.data.apiKey);
      formData.append("cloud_name", res1.data.cloudName);
      formData.append("type", res1.data.type);
      formData.append("folder", "private_media/course_videos");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
        formData,
        {
          withCredentials: false,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );
      set({ isLoading: false });

      return {
        url: res.data.secure_url as string,
        duration: res.data.duration as number,
        size: res.data.bytes as number,
        public_id: res.data.public_id as string,
        resource_type: res.data.resource_type as string,
      };
    } catch (error: any) {
      console.error("Error uploading video:", error.message);
      set({ error: `Error uploading video: ${error.message}` });
      throw error;
    }
  },

  uploadCoursePdf: async (coursePdf, setUploadProgress) => {
    set({ isLoading: true, error: null });
    try {
      //Get signed params from backend
      const res1 = await axios.post(
        `${baseURL}/api/courses/upload/signed`,
        {
          folder: "private_media/course_pdf",
          resource_type: "raw",
        },
        { withCredentials: true }
      );

      //upload document using signed credentials
      const formData = new FormData();
      formData.append("file", coursePdf);
      formData.append("timestamp", res1.data.timestamp);
      formData.append("signature", res1.data.signature);
      formData.append("api_key", res1.data.apiKey);
      formData.append("cloud_name", res1.data.cloudName);
      formData.append("type", res1.data.type);
      formData.append("folder", "private_media/course_pdf");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
        formData,
        {
          withCredentials: false,

          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      set({ isLoading: false });
      return {
        url: res.data.secure_url as string,
        public_id: res.data.public_id as string,
        resource_type: res.data.resource_type as string,
      };
    } catch (error: any) {
      console.error("Error uploading pdf:", error.message);
      set({ error: `Error uploading pdf: ${error.message}` });
      throw error;
    }
  },
  getSignedUrl: async (publicId: string, resource_type: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${baseURL}/api/courses/upload/signed-url`, {
        params: { publicId, resource_type },
        withCredentials: true,
      });
      set({ signedUrl: res.data.url, isLoading: false });
      return res.data.url;
    } catch (error) {
      console.log("Error fetching signed url: ", (error as any).message);

      set({
        error: `Error fetching signed url: ${(error as any).message}`,
        isLoading: false,
      });
    }
  },
  uploadCourse: async (courseForm: any, setUploadProgress: any) => {
    set({ isLoading: true, error: null });
    try {
      const imageUrl = await get().uploadCourseImage(
        courseForm.courseImage,
        setUploadProgress
      );

      if (imageUrl) {
        const courseData = {
          courseTitle: courseForm.courseTitle,
          courseCategory: courseForm.courseCategory,
          courseDifficulty: courseForm.courseDifficulty,
          prerequisites: courseForm.prerequisites,
          objectives: courseForm.objectives,
          duration: courseForm.duration,
          courseImage: imageUrl,
          courseSections: courseForm.courseSections,
          metaTitle: courseForm.metaTitle,
          metaDescription: courseForm.metaDescription,
          visibility: courseForm.visibility,
          instructorDisplayName: courseForm.instructorDisplayName,
          instructorBio: courseForm.instructorBio,
        };

        const res = await axios.post(
          `${baseURL}/api/courses/create`,
          courseData,
          {
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              setUploadProgress(percentCompleted);
              console.log(`Upload Progress: ${percentCompleted}%`);
            },
          }
        );
        set({ isLoading: false, createdCourse: res.data.createdCourse });
        return res;
      }
    } catch (error: any) {
      console.log("Error creating course: ", error.message);
      set({ isLoading: false, error: "Error creating Course!" });
    }
  },
}));

export default useCourseStore;

// courseTitle: string;
// courseDescription: string;
// courseCategory: string;
// courseDifficulty: string;
// prerequisites: { id: number; value: string }[];
// objectives: { id: number; value: string }[];
// duration: number;
// courseImage: File | null;
// courseSections: videoCourseSectionsType;
// metaTitle: string;
// metaDescription: string;
// visibility: string;
// instructorDisplayName: string;
// instructorBio: string;
