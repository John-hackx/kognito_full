import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "none", // Helps prevent CSRF attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });
};

export default generateTokenAndSetCookie;
