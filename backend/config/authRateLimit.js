import { redis } from "../services/upstashRedis.service.js";
import dotenv from "dotenv";
import { Ratelimit } from "@upstash/ratelimit";

dotenv.config();

export const loginRateLimiter = async (req, res, next) => {
  const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "300 s"),
    analytics: true,
  });

  const ip = req.ip || req.socket.remoteAddress;

  try {
    const { success, limit, remaining, reset } = await rateLimit.limit(ip);

    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });

    if (!success) {
      res.status(429).json({
        error: "Too many requests!!",
        limit,
        remaining,
        resetTime: reset,
        retryAfter: new Date(reset),
      });
    }
    next();
  } catch (error) {
    console.log("Error with rate limit: ", error);
    next();
  }
};

export const authRateLimit = async (req, res, next) => {
  const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "300 s"),
    analytics: true,
  });

  const ip = req.ip || req.socket.remoteAddress;

  try {
    const { success, limit, remaining, reset } = await rateLimit.limit(ip);

    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });

    if (!success) {
      res.status(429).json({
        error: "Too many attempts",
        limit,
        remaining,
        resetTime: reset,
        retryAfter: new Date(reset),
      });
    }
    next();
  } catch (error) {
    console.log("Error with rate limiting: ", error);
    next();
  }
};
