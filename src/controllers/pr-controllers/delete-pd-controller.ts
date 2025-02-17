import { Request, Response } from "express";

import { PR } from "../../models/personal-records";

export async function deletePr(req: Request, res: Response): Promise<any> {
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
