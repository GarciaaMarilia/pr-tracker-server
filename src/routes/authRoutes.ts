import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

import { User } from "../models/user";

const Authrouter = express.Router();

Authrouter.post(
 "/register",
 async (req: Request, res: Response): Promise<any> => {
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
);

Authrouter.post("/login", async (req: Request, res: Response): Promise<any> => {
 const { email, password } = req.body;
 try {
  const user = await User.findOne({ email });

  if (!user) {
   return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, "default_jwt_secret", {
   expiresIn: "1h",
  });

  return res.status(200).json({ token, user });
 } catch (error) {
  res.status(200).send({ status: "error", error: error });
 }
});

export default Authrouter;
