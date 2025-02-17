import express from "express";

import { login } from "../controllers/auth-controllers/login-controller";
import { registerUser } from "../controllers/auth-controllers/register-controller";

const Authrouter = express.Router();

Authrouter.post("/register", registerUser);

Authrouter.post("/login", login);

export default Authrouter;
