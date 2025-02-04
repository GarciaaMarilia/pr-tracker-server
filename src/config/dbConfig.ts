import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.STRING_CONNEXION;

if (!MONGO_URI) {
 throw new Error("MONGO_URI is not defined!");
}

export const connectDB = async () => {
 try {
  await mongoose.connect(MONGO_URI, {
   dbName: "pr-tracker-db",
  });
  console.log("MongoDB connected");
 } catch (error) {
  console.error("Error to connect MongoDB", error);
  process.exit();
 }
};
