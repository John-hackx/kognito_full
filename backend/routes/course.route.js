import express from "express";
import { instructorAuthMiddleware } from "../middlewares/instructorAuthMiddleWare.js";
import {
  createCourse,
  getSignedCloudinaryUrl,
  signCloudinaryUrl,
} from "../controllers/courseController.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/create", instructorAuthMiddleware, createCourse);
router.post("/upload/signed", protectedRoute, signCloudinaryUrl);
router.get("/upload/signed-url", protectedRoute, getSignedCloudinaryUrl);

export default router; //imported as courseRouter
