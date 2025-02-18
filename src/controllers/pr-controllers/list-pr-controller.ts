import { Request, Response } from "express";

import { PR } from "../../models/personal-records";

export async function listPr(req: Request, res: Response): Promise<any> {
 try {
  const { type, exercise } = req.body;

  if (!req.user || !req.user.userId) {
   return res.status(401).json({ message: "Unauthorized" });
  }

  if (!type || !exercise) {
   return res.status(400).json({ message: "All fields are required" });
  }

  const prs = await PR.find({
   user: req.user.userId,
   type: type,
   exercise: exercise,
  }).sort({ date: 1 });

  if (prs.length === 0) {
   return res.status(404).json({ message: "No PRs found" });
  }

  const prsResult = {
   user: req.user.userId,
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
