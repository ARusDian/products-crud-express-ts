import { NextFunction, Request, Response } from "express";

import {
	BaseOrderModel,
	DataDetailResponse,
	OrderModel,
	SuccessResponse,
	UserAuthInfoRequest,
} from "../models";
import {
	createOrderService, deleteOrderService, getOrderByIdService, getOrdersService, updateOrderService,
} from "../services";

export const createOrder = async (req: UserAuthInfoRequest, res: Response) => {
	const order = await createOrderService(req);
	const response = new SuccessResponse<BaseOrderModel>(
		201,
		"Created",
		new DataDetailResponse<BaseOrderModel>(
			"orders",
			order
		)
	);
	res.status(response.code).json(response);
	return;
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await updateOrderService(Number(req.params.id), req);
		const response = new SuccessResponse<BaseOrderModel>(
			200,
			"OK",
			new DataDetailResponse<BaseOrderModel>(
				"orders",
				order
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getOrders = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const orders = await getOrdersService(req);
		const response = new SuccessResponse<OrderModel[]>(
			200,
			"OK",
			new DataDetailResponse<OrderModel[]>(
				"orders",
				orders
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getOrderById = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const order = await getOrderByIdService(Number(req.params.id), req);
		const response = new SuccessResponse<OrderModel>(
			200,
			"OK",
			new DataDetailResponse<OrderModel>(
				"orders",
				order
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const deleteOrder = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const order = await deleteOrderService(Number(req.params.id), req);
		const response = new SuccessResponse<BaseOrderModel>(
			200,
			"OK",
			new DataDetailResponse<BaseOrderModel>(
				"orders",
				order
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};



