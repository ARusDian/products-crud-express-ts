import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ErrorResponse, ErrorDetails } from "../models";
import { numberValidation, categoryInputValidation } from ".";


const prisma = new PrismaClient();

export const getCategoriesService = async () => {
	return await prisma.category.findMany();
};

export const getCategoryByIdService = async (id: number | string) => {
	id = numberValidation(id, "getCategory", "Category id");

	const category = await prisma.category.findUnique({
		where: {
			id: id
		}
	});
	
	if (!category) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getCategory",
				"Category not found",
				`Category with id ${id} not found`
			)
		);
	}
	return category;
};

export const getCategoryByIdWithProductsService = async (id: number | string) => {
	id = numberValidation(id, "getCategoryWithProducts", "Category id");

	const category = await prisma.category.findUnique({
		where: {
			id: id
		},
		include: {
			products: true
		}
	});

	if (!category) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getCategory",
				"Category not found",
				`Category with id ${id} not found`
			)
		);
	}
	return category;
};


export const createCategoryService = (req: Request) => {
	const category = categoryInputValidation(req.body);

	return prisma.category.create({
		data: category
	});
};

export const updateCategoryService = async (id: number | string, req: Request) => {
	id = numberValidation(id, "updateCategory", "Category id");
	const category = categoryInputValidation(req.body);

	const categoryExists = await getCategoryByIdService(id);

	return await prisma.category.update({
		where: {
			id: categoryExists.id
		},
		data: category
	});
};

export const deleteCategoryService = async (id: number | string) => {
	id = numberValidation(id, "deleteCategory", "Category id");

	const category = await getCategoryByIdService(id);

	return await prisma.category.delete({
		where: {
			id: category.id
		}
	});
};
