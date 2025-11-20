import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { authRateLimit, loginRateLimiter } from "../config/authRateLimit.js";
import {
  login,
  logout,
  refreshToken,
  signUpAdmin,
  signUpInstructor,
  signUpStudent,
  verifyOtp,
} from "../controllers/authControllers.controller.js";

const router = express.Router();

router.post("/admin/signup", authRateLimit, signUpAdmin);
router.post("/student/signup", authRateLimit, signUpStudent);
router.post("/instructor/signup", authRateLimit, signUpInstructor);
router.post("/login", loginRateLimiter, login);
router.post("/verifyotp/:id", verifyOtp);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/me", protectedRoute);
export default router; //imported as authRouter
