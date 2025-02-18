import { Request, Response } from "express";

import { PRType } from "./types";
import { PR } from "../../models/personal-records";

export async function UpdatePr(req: Request, res: Response): Promise<any> {
 const { id } = req.params;
 const { type, exercise, value, date } = req.body;

 try {
  if (!req.user || !req.user.userId) {
   return res.status(401).json({ message: "Unauthorized" });
  }

  const pr: PRType | null = await PR.findById(id);

  if (!pr) {
   return res.status(404).json({ message: "PR not found." });
  }

  if (pr.user.toString() !== req.user.userId) {
   return res
    .status(403)
    .json({ message: "You are not allowed to update this PR." });
  }

  const updatedPr = await PR.findByIdAndUpdate(
   id,
   {
    type: type || pr.type,
    exercise: exercise || pr.exercise,
    value: value || pr.value,
    date: date || pr.date,
   },
   { new: true }
  );

  res.status(200).json({ message: "PR updated successfully", updatedPr });
 } catch (error) {
  res.status(500).json({ message: "Error updating PR", error });
 }
}
