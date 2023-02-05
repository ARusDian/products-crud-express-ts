import express from "express";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getCategoryByIdWithProducts,
	updateProduct
} from "../controllers";


const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/:id/categories", getCategoryByIdWithProducts);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export { productRouter };
