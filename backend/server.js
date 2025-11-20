import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import courseRouter from "./routes/course.route.js";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//routes
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  connectDB();
});
