import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { PRType } from "./types";
import { User } from "../../models/user";
import { PR } from "../../models/personal-records";

export async function createPr(req: Request, res: Response): Promise<any> {
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

  const pr: PRType = await PR.create({
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
