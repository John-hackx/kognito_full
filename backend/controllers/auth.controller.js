import generateTokenAndSetCookie from "../lib/utils/generateToken.js";
import UserModel from "../models/userModel.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "invalid email format" });
    }

    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already exists!" });
    }
    if (!firstName || !lastName || !password) {
      res
        .status(400)
        .json({ error: "firt name, last name and password must be provided!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be at least 6 characters!" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      const savedNewUser = await newUser.save();
      res.status(201).json({
        message: "user created successfully",
        data: {
          _id: savedNewUser._id,
          firstName: savedNewUser.firstName,
          lastName: savedNewUser.lastName,
          email: savedNewUser.email,
        },
      });
    }
  } catch (error) {
    console.log("Error creating user: ", error.message);
    res.status(500).json({ error: "internal server error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid email or password!" });
    }

    generateTokenAndSetCookie(user._id, res);
    // console.log("User logged in: ");
    res.status(200).json({
      message: "successfully logged in",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error login in: ", error.message);
    res.status(500).json({ error: "internal server error!" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Set maxAge to 0 to clear the cookie
    });
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res
      .status(200)
      .json({ success: true, message: "successfully logged out!" });
  } catch (error) {
    console.log("Error logging out: ", error.message);
    res.status(500).json({ error: "internal server error!" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "user not found!" });
    }
    // console.log(user);
    res
      .status(200)
      .json({ message: "successfully got logged-in user", data: user });
  } catch (error) {
    console.log("Error getting logged in user: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
