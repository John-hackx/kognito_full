import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully: ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting database: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
