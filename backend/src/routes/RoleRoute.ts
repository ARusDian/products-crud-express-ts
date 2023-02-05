import express from "express";
import {
	createRole,
	deleteRole,
	getRoleById,
	getRolebyIdwithUsers,
	getRoles,
	updateRole,
} from "../controllers";


const roleRouter = express.Router();

roleRouter.get("/", getRoles );
roleRouter.get("/:id", getRoleById);
roleRouter.get("/:id/users", getRolebyIdwithUsers);
roleRouter.post("/", createRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export { roleRouter };
