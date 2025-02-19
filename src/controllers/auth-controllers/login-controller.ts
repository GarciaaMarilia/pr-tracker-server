import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { User } from "../../models/user";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req: Request, res: Response): Promise<any> {
 try {
  if (!JWT_SECRET) {
   throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
   return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
   expiresIn: "1h",
  });

  return res
   .status(200)
   .json({ token, user: { userId: user._id, name: user.name } });
 } catch (error) {
  res.status(200).send({ status: "error", error: error });
 }
}
