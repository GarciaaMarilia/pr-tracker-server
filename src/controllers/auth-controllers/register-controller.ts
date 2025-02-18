import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { User } from "../../models/user";

export async function registerUser(req: Request, res: Response): Promise<any> {
 const { name, email, password } = req.body;
 try {
  if (!name || !email || !password) {
   return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return res.status(201).json({ message: "User registered successfully" });
 } catch (error) {
  res.status(500).send({ status: "error", error: error });
 }
}
