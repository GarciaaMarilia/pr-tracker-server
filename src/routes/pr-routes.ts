import express from "express";

import { createPr } from "../controllers/pr-controllers/create-pr-controller";
import { listPr } from "../controllers/pr-controllers/list-pr-controller";
import { UpdatePr } from "../controllers/pr-controllers/update-pr-controller";
import { deletePr } from "../controllers/pr-controllers/delete-pd-controller";

const PrRouter = express.Router();

PrRouter.post("/register", createPr);

PrRouter.post("/list", listPr);

PrRouter.put("/update/:id", UpdatePr);

PrRouter.delete("/delete/:id", deletePr);

export default PrRouter;
