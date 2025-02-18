import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
 namespace Express {
  interface Request {
   user?: { userId: string };
  }
 }
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateToken(
 req: Request,
 res: Response,
 next: NextFunction
) {
 if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
 }

 const authHeader = req.headers["authorization"];

 if (!authHeader) {
  return res.status(401).json({ message: "Authorization header missing." });
 }

 const token = authHeader.split(" ")[1];

 if (!token) {
  return res.status(401).json({ message: "Access denied. No token provided." });
 }

 try {
  const decoded = jwt.verify(token, JWT_SECRET) as unknown;

  if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
   req.user = { userId: (decoded as { userId: string }).userId };
   next();
  } else {
   return res.status(403).json({ message: "Invalid token structure." });
  }
 } catch (error) {
  return res.status(403).json({ message: "Invalid or expired token." });
 }
}
