import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import PrRouter from "./routes/pr-routes";
import Authrouter from "./routes/auth-routes";
import { connectDB } from "./config/dbConfig";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", Authrouter);
app.use("/pr", PrRouter);

app.get("/", (req: Request, res: Response) => {
 res.send("Server running!");
});

// app.get("/*", (res: Response) => {
//  res.send("Not found");
// });

const port = process.env.PORT;

app.listen(port, () => {
 console.log("Server running!");
});
