import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { PR } from "../../models/personal-records";

export async function listPr(req: Request, res: Response): Promise<any> {
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
}
