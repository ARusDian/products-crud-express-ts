import express from "express";
import {
	createOrder,
	deleteOrder,
	getOrderById,
	getOrders,
	updateOrder
} from "../controllers";


const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export { orderRouter };
