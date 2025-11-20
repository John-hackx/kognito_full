import cloudinary from "../config/cloudinary.config.js";
import CourseModel from "../model/course.model.js";
import UserModel from "../model/user.model.js";
import crypto from "crypto";

export const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      courseCategory,
      courseDifficulty,
      prerequisites,
      objectives,
      duration,
      courseImage,
      courseSections,
      metaTitle,
      metaDescription,
      visibility,
      instructorDisplayName,
      instructorBio,
    } = req.body;

    if (
      !courseTitle ||
      !courseCategory ||
      !courseDifficulty ||
      !prerequisites ||
      !objectives ||
      !duration ||
      !courseImage ||
      !courseSections ||
      !metaTitle ||
      !metaDescription ||
      !metaDescription ||
      !visibility ||
      !instructorDisplayName ||
      !instructorBio
    ) {
      return res.status(400).json({ error: "All fields are required!!" });
    }

    const newCourse = new CourseModel({
      courseTitle,
      courseCategory,
      courseDifficulty,
      prerequisites,
      objectives,
      duration,
      courseImage,
      courseSections,
      metaTitle,
      metaDescription,
      visibility,
      instructor: req.user._id,
      instructorDisplayName,
      instructorBio,
    });

    const savedCourse = await newCourse.save();

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { createdCourses: savedCourse._id },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Course created successfully",
        course: savedCourse,
      });
  } catch (error) {
    console.error("Error creating course:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }
  }
};

export const signCloudinaryUrl = async (req, res) => {
  const { folder, resource_type } = req.body;

  const timestamp = Math.round(new Date().getTime() / 1000);

  // DON'T include resource_type in signature
  const paramsToSign = {
    folder: folder,
    timestamp: timestamp,
    type: "authenticated",
  };

  // Create the string to sign
  const stringToSign = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  console.log("String to sign:", stringToSign); // Debug

  // Use SHA1, not SHA256
  const signature = crypto
    .createHash("sha1") // Changed from sha256
    .update(stringToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  console.log("Signature:", signature); // Debug

  res.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME, // Changed key name
    apiKey: process.env.CLOUDINARY_API_KEY, // Changed key name
    folder,
    type: "authenticated",
  });
};

export const getSignedCloudinaryUrl = async (req, res) => {
  try {
    const { publicId, resource_type } = req.query;
    const signedUrl = cloudinary.utils.url(publicId, {
      type: "authenticated",
      resource_type: resource_type,
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 5, // expires in 5 mins
    });

    res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.log("Error getting signed url: ", error.message);

    res.status(500).json({ error: "internal server error!" });
  }
};
