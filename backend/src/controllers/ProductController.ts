import {
	DataDetailResponse,
	ProductModel,
	SuccessResponse,
} from "../models";

import {
	createProductService,
	deleteProductService,
	getProductByIdService,
	getProductsService,
	updateProductService
} from "../services";
import { NextFunction, Request, Response } from "express";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await getProductsService(req);
		const response = new SuccessResponse<ProductModel[]>(
			200,
			"OK",
			new DataDetailResponse<ProductModel[]>(
				"products",
				products
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await getProductByIdService(Number(req.params.id));
		const response = new SuccessResponse<ProductModel>(
			200,
			"OK",
			new DataDetailResponse<ProductModel>(
				"products",
				product
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await createProductService(req);
		const response = new SuccessResponse<ProductModel>(
			201,
			"Created",
			new DataDetailResponse<ProductModel>(
				"products",
				product
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await updateProductService(Number(req.params.id), req);
		const response = new SuccessResponse<ProductModel>(
			200,
			"OK",
			new DataDetailResponse<ProductModel>(
				"products",
				product
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await deleteProductService(Number(req.params.id), req);
		const response = new SuccessResponse<ProductModel>(
			200,
			"OK",
			new DataDetailResponse<ProductModel>(
				"products",
				product
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};
