import mongoose, { Schema } from "mongoose";

const PRSchema: Schema = new Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  exercise: { type: String, required: true },
  value: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
 },
 {
  timestamps: true,
 }
);

export const PR = mongoose.model("PR", PRSchema);
