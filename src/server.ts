import express, { Request, Response } from "express";
import { connectDB } from "./config/dbConfig";

const app = express();
const port = 3000;

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
 res.send("Server running!");
});

app.listen(port, () => {
 console.log("Server running!");
});
