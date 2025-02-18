import express from "express";

import { createPr } from "../controllers/pr-controllers/create-pr-controller";
import { listPr } from "../controllers/pr-controllers/list-pr-controller";
import { UpdatePr } from "../controllers/pr-controllers/update-pr-controller";
import { deletePr } from "../controllers/pr-controllers/delete-pd-controller";
import { authenticateToken } from "../middlewares/authMiddleware";

const PrRouter = express.Router();

PrRouter.post("/register", authenticateToken, createPr);

PrRouter.post("/list", authenticateToken, listPr);

PrRouter.put("/update/:id", authenticateToken, UpdatePr);

PrRouter.delete("/delete/:id", authenticateToken, deletePr);

export default PrRouter;
