import mongoose from "mongoose";

const PRSchema = new mongoose.Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  exercise: { type: String, required: true },
  value: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
 },
 {
  timestamps: true, // createdAt and updatedAt
 }
);

export const PR = mongoose.model("PR", PRSchema);
