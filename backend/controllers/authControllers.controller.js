import UserModel from "../model/user.model.js";
import {
  generateOTP,
  sendOTPEmail,
  storeOtpRedis,
} from "../services/email.service.js";
import {
  clearCookies,
  compareRefreshToken,
  deleteRefreshToken,
  generateTokens,
  retrieveRefreshToken,
  setAccessCookie,
  setRefreshCookie,
  storeRefreshToken,
  verifyRefreshToken,
} from "../utils/lib/handleToken.js";
import { signupValidation } from "../utils/lib/joiValidation.js";
import bcrypt from "bcryptjs";
import { redis } from "../services/upstashRedis.service.js";

export const signUpAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const data = { firstName, lastName, email, password };

  try {
    const { error } = signupValidation(data);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((error) => error.message),
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists!" });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();
    await storeOtpRedis(newUser, otp);
    await sendOTPEmail(email, otp, firstName);

    res
      .status(201)
      .json({
        success: true,
        message: "User successfully created!",
        data: newUser,
      });
  } catch (error) {
    console.error("Error signing up: ", error.message);
    res.status(500).json({ error: "internal server error with sign up" });
  }
};

export const signUpStudent = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const data = { firstName, lastName, email, password };

  try {
    const { error } = signupValidation(data);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((error) => error.message),
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists!" });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "student",
    });

    await newUser.save();
    await storeOtpRedis(newUser, otp);
    await sendOTPEmail(email, otp, firstName);

    res.status(201).json({
      success: true,
      message: "User successfully created!",
      data: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error signing up: ", error.message);
    res.status(500).json({ error: "internal server error with sign up" });
  }
};

export const signUpInstructor = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const data = { firstName, lastName, email, password };

  try {
    const { error } = signupValidation(data);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((error) => error.message),
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists!" });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "instructor",
    });

    await newUser.save();
    await storeOtpRedis(newUser, otp);
    await sendOTPEmail(email, otp, firstName);

    res.status(201).json({
      success: true,
      message: "User successfully created!",
      data: newUser,
    });
  } catch (error) {
    console.error("Error signing up: ", error.message);
    res.status(500).json({ error: "internal server error with sign up" });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;
  const { id } = req.params;
  try {
    const key = `otp:${id}`;
    const storedOtp = await redis.get(key);
    console.log(otp, storedOtp);
    if (!storedOtp) {
      return res.status(404).json({
        success: false,
        error: "No Otp for this user stored in redis!",
      });
    }
    const match = otp === storedOtp.toString();
    if (!match) {
      return res
        .status(400)
        .json({ success: false, error: "OTP code is not correct!" });
    }
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        error: "User not found during otp verification",
      });
    user.isVerified = true;
    await user.save();
    await redis.del(key);

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying otp: ", error.message);
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, error: "User not found!" });
    }

    if (!user.isVerified) {
      const otp = generateOTP();
      user.otp = otp;
      await storeOtpRedis(user, otp);

      await sendOTPEmail();
      return res.status(403).json({
        success: false,
        error: "User not verified! Check your email to verify",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect email or password!" });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    await storeRefreshToken(refreshToken, user);
    setAccessCookie(res, "accessToken", accessToken);
    setRefreshCookie(res, "refreshToken", refreshToken);

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully!", data: user });
  } catch (error) {
    console.error("Error loggin in: ", error.message);
    res.status(500).json({ error: "internal server error!!" });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(403)
      .json({ success: false, error: "No refresh token in cookies" });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    if (!payload)
      return res
        .status(401)
        .json({ success: false, error: "Invalid Refresh Token!" });
    const user = await UserModel.findById({ id: payload.id });
    if (!user)
      return res.status(404).json({ success: false, error: "User not found!" });
    const storedRefreshToken = await retrieveRefreshToken(user);
    const isValid = await compareRefreshToken(refreshToken, storedRefreshToken);
    if (!isValid)
      return res.status(401).json({
        success: false,
        error: "Hashed refresh token in redis do not match ur refresh token",
      });
    //generate new tokens
    const { accessToken, refreshToken } = generateTokens(user);
    //delete old refresh token in redis
    const isDeleted = await deleteRefreshToken(user);
    if (!isDeleted)
      return res.status(401).json({
        success: false,
        error: "Couldn't delete old refresh token from redis!",
      });
    // store new refresh token in redis
    const isStored = await storeRefreshToken(refreshToken, user);
    if (!isStored)
      return res.status(400).json({
        success: false,
        error: "Couldn't store new refresh token in redis!",
      });
    setAccessCookie(res, "accessToken", accessToken);
    setRefreshCookie(res, "refreshToken", refreshToken);
    res
      .status(200)
      .json({ success: true, message: "Successfully refreshed access token!" });
  } catch (error) {
    console.error("Error refreshing access token: ", error.message);
    res.status(500).json({ success: false, error: "internal server error!" });
  }
};

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await UserModel.findById(payload.id);
      await deleteRefreshToken(user);
    } catch (error) {
      console.error("Error logging out: ", error.message);
      res.status(500).json({ success: false, error: "internal server error!" });
    }
  }

  clearCookies(res, "refreshToken");
  clearCookies(res, "accessToken");
  res.status(200).json({ success: true, message: "Logged out successfully!" });
};
