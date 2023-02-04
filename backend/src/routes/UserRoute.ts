import express from "express";
import { createUser, deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from "../controllers";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export { userRouter };
