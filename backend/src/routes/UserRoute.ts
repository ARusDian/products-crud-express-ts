import express from "express";
import { createUser, deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from "../controllers";
import { verifyUser } from "../middleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", verifyUser, getUsers);
userRouter.get("/:id", verifyUser, getUser);
userRouter.put("/:id", verifyUser, updateUser);
userRouter.post("/", verifyUser, createUser);
userRouter.delete("/:id", verifyUser, deleteUser);

export { userRouter };
