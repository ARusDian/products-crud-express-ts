import express from "express";

import {
	getCategories,
	getCategoryById,
	getCategoryByIdWithProducts,
	createCategory,
	updateCategory,
	deleteCategory
} from "../controllers";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.get("/:id/products", getCategoryByIdWithProducts);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export { categoryRouter };
