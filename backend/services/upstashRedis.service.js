import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const testRedisConnection = async () => {
  try {
    const result = await redis.ping();
    console.log("Redis connection successful: ", result);
  } catch (error) {
    console.error(
      "Error connecting to redis: rate limit may be stored in memory!:",
      error.message
    );
  }
};

testRedisConnection();
