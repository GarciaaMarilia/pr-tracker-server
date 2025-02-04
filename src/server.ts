import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import Authrouter from "./routes/authRoutes";
import { connectDB } from "./config/dbConfig";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", Authrouter);

app.get("/", (req: Request, res: Response) => {
 res.send("Server running!");
});

const port = process.env.PORT;

app.listen(port, () => {
 console.log("Server running!");
});
