import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.routes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server started on port ${PORT}...`);
});
