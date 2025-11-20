// import { required } from "joi";
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    lessonTitle: {
      type: String,
      required: true,
      trim: true,
    },
    lessonDescription: {
      type: String,
      required: true,
    },
    lessonFileUrl: {
      fileType: {
        type: String,
        enum: ["video", "raw"],
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const sectionSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      required: true,
      trim: true,
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
  },
  courseCategory: {
    type: String,
    enum: [
      "Software Development",
      "G.E.S.",
      "Business & Marketing",
      "Music",
      "Design & Graphics",
    ],
    required: true,
  },
  courseDifficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  prerequisites: [
    {
      id: { type: Number, required: true },
      value: { type: String, required: true },
    },
  ],
  objectives: [
    {
      id: { type: Number, required: true },
      value: { type: String, required: true },
    },
  ],
  duration: {
    type: Number, //in hours
    required: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  courseSections: [sectionSchema],
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    enum: ["public", "members"],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  instructorDisplayName: {
    type: String,
    required: true,
  },
  instructorBio: {
    type: String,
    required: true,
  },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  totalEnrolledStudents: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isPublished: { type: Boolean, default: false },
});

courseSchema.index({ courseTitle: "text", metaDescription: "text" });
courseSchema.index({ courseDifficulty: 1, courseCategory: 1 });

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
