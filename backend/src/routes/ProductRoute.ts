import express from "express";
import { verifyUser } from "../middleware";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct
} from "../controllers";


const productRouter = express.Router();

productRouter.get("/", verifyUser, getProducts);
productRouter.get("/:id", verifyUser, getProductById);
productRouter.post("/", verifyUser, createProduct);
productRouter.put("/:id", verifyUser, updateProduct);
productRouter.delete("/:id", verifyUser, deleteProduct);

export { productRouter };
