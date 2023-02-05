import { NextFunction, Request, Response } from "express";
import {
	DataDetailResponse,
	CategoryModel,
	SuccessResponse,
} from "../models";

import {
	getCategoriesService,
	getCategoryByIdService,
	getCategoryByIdWithProductsService,
	createCategoryService,
	updateCategoryService,
	deleteCategoryService
} from "../services";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await getCategoriesService();
		const response = new SuccessResponse<CategoryModel[]>(
			200,
			"OK",
			new DataDetailResponse<CategoryModel[]>(
				"getCategories",
				categories
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await getCategoryByIdService(req.params.id);
		const response = new SuccessResponse<CategoryModel>(
			200,
			"OK",
			new DataDetailResponse<CategoryModel>(
				"getCategoryById",
				category
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getCategoryByIdWithProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await getCategoryByIdWithProductsService(req.params.id);
		const response = new SuccessResponse<CategoryModel>(
			200,
			"OK",
			new DataDetailResponse<CategoryModel>(
				"getCategoryByIdWithProducts",
				category
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await createCategoryService(req.body);
		const response = new SuccessResponse<CategoryModel>(
			200,
			"OK",
			new DataDetailResponse<CategoryModel>(
				"createCategory",
				category
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await updateCategoryService(req.params.id, req.body);
		const response = new SuccessResponse<CategoryModel>(
			200,
			"OK",
			new DataDetailResponse<CategoryModel>(
				"updateCategory",
				category
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await deleteCategoryService(req.params.id);
		const response = new SuccessResponse<CategoryModel>(
			200,
			"OK",
			new DataDetailResponse<CategoryModel>(
				"deleteCategory",
				category
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};




