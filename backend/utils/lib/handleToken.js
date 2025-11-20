import dotenv from "dotenv";
import { redis } from "../../services/upstashRedis.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

export const generateTokens = (user) => {
  const payload = { id: user._id.toString(), role: user.role };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return payload;
};

export const verifyRefreshToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  return payload;
};

export const storeRefreshToken = async (refreshToken, user) => {
  try {
    const key = `refreshToken:${user._id}`;
    const hashedToken = await bcrypt.hash(refreshToken, 12);
    await redis.set(key, hashedToken, { ex: 7 * 24 * 60 * 60 });
    return true;
  } catch (error) {
    console.log("Error storing refresh token in redis: ", error.message);
    return null;
  }
};

export const retrieveRefreshToken = async (user) => {
  try {
    const key = `refreshToken:${user._id}`;
    const storedToken = await redis.get(key);
    return storedToken;
  } catch (error) {
    console.error("Error retrieving refresh token from redis: ", error.message);
    return null;
  }
};

export const compareRefreshToken = async (refreshToken, storedRefreshToken) => {
  try {
    const isValid = await bcrypt.compare(refreshToken, storedRefreshToken);
    return isValid;
  } catch (error) {
    console.error("Error verifying refresh tokens: ", error.message);
    return null;
  }
};

export const deleteRefreshToken = async (user) => {
  try {
    const key = `refreshToken:${user._id}`;
    await redis.del(key);
    return true;
  } catch (error) {
    console.error("Error deleting refresh token from redis: ", error.message);
    return null;
  }
};

export const setAccessCookie = (res, cookieName, value) => {
  res.cookie(cookieName, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // domain: process.env.CLIENT_URL,
    path: "/",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });
};

export const setRefreshCookie = (res, cookieName, value) => {
  res.cookie(cookieName, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // domain: process.env.CLIENT_URL,
    path: "/",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 1000,
  });
};

export const clearCookies = (res, cookieName) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // domain: process.env.CLIENT_URL,
    path: "/",
    sameSite: "Strict",
    maxAge: cookieName === "refreshToken" ? 7 * 24 * 60 * 1000 : 15 * 60 * 1000,
  });
};
