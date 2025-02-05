import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import express, { Request, Response } from "express";

import { User } from "../models/user";
import { PR } from "../models/personal-records";

interface PR extends Document {
 user: mongoose.Schema.Types.ObjectId;
 type: string;
 exercise: string;
 value: string;
 date: Date;
}

const PrRouter = express.Router();

PrRouter.post(
 "/register",
 async (req: Request, res: Response): Promise<any> => {
  const { token, type, exercise, value, date } = req.body;

  try {
   const decoded = jwt.verify(token, "default_jwt_secret") as {
    userId: string;
   };

   if (!decoded.userId) {
    return res.status(400).json({ message: "UserId is required" });
   }

   if (!type || !exercise || !value || !date) {
    return res.status(400).json({ message: "All fields are required" });
   }

   const user = await User.findById(decoded.userId);

   if (!user) {
    return res.status(404).json({ message: "User not found." });
   }

   const pr = await PR.create({
    user: decoded.userId,
    type,
    exercise,
    value,
    date,
   });

   res.status(201).json({ message: "PR registered", pr });
  } catch (error) {
   res.status(500).json({ message: "Error registering PR", error });
  }
 }
);

PrRouter.post("/list", async (req: Request, res: Response): Promise<any> => {
 const { token, type, exercise } = req.body;

 try {
  if (!token || !type || !exercise) {
   return res.status(400).json({ message: "All fields are required" });
  }

  const decoded = jwt.verify(token, "default_jwt_secret") as {
   userId: string;
  };

  if (!decoded.userId) {
   return res.status(400).json({ message: "UserId is required" });
  }

  const prs = await PR.find({
   user: decoded.userId,
   type: type,
   exercise: exercise,
  }).sort({ date: 1 });

  if (prs.length === 0) {
   return res.status(404).json({ message: "No PRs found" });
  }

  const prsResult = {
   user: decoded.userId,
   type: type,
   exercise: exercise,
   data: prs.map((pr) => ({
    id: pr.id,
    date: pr.date,
    value: pr.value,
   })),
  };

  res.status(200).json({ message: "PRs retrieved successfully", prsResult });
 } catch (error) {
  res.status(500).json({ message: "Error listing PRs", error });
 }
});

PrRouter.put(
 "/update/:id",
 async (req: Request, res: Response): Promise<any> => {
  const { token, type, exercise, value, date } = req.body;
  const { id } = req.params;

  try {
   const decoded = jwt.verify(token, "default_jwt_secret") as {
    userId: string;
   };

   if (!decoded.userId) {
    return res.status(400).json({ message: "UserId is required" });
   }

   const pr: PR | null = await PR.findById(id);

   if (!pr) {
    return res.status(404).json({ message: "PR not found." });
   }

   if (pr.user.toString() !== decoded.userId) {
    return res
     .status(403)
     .json({ message: "You are not allowed to update this PR." });
   }

   await PR.deleteOne({ _id: id });

   const updatedPr = await PR.create({
    _id: id,
    user: decoded.userId,
    type: (pr.type = type || pr.type),
    exercise: (pr.exercise = exercise || pr.exercise),
    value: (pr.value = value || pr.value),
    date: (pr.date = date || pr.date),
   });

   res.status(200).json({ message: "PR updated successfully", updatedPr });
  } catch (error) {
   res.status(500).json({ message: "Error updating PR", error });
  }
 }
);

PrRouter.delete(
 "/delete/:id",
 async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
   const result = await PR.deleteOne({ _id: id });

   if (result.deletedCount === 0) {
    return res.status(404).json({ message: "PR not found." });
   }
   res.status(200).json({ message: "PR deleted successfully" });
  } catch (error) {
   res.status(500).json({ message: "Error deleting PR", error });
  }
 }
);

export default PrRouter;
