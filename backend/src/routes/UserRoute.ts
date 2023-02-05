import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export { userRouter };
