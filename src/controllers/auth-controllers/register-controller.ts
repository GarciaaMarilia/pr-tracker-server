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
  const user = await User.create({ name, email, password: hashedPassword });

  return res.status(201).json({ message: "User registered" });
 } catch (error) {
  res.status(200).send({ status: "error", error: error });
 }
}
