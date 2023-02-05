import express from "express";
import { authenticatedUser, loginUser, registerUser } from "../controllers";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.get("/authenticated", authenticatedUser);

export { AuthRouter };
