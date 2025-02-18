import { Request, Response } from "express";

import { User } from "../../models/user";
import { PR } from "../../models/personal-records";

export async function createPr(req: Request, res: Response): Promise<any> {
 try {
  const { type, exercise, value, date } = req.body;

  if (!req.user || !req.user.userId) {
   return res.status(401).json({ message: "Unauthorized" });
  }

  if (!type || !exercise || !value || !date) {
   return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(req.user.userId);

  if (!user) {
   return res.status(404).json({ message: "User not found." });
  }

  const pr = await PR.create({
   user: req.user.userId,
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
