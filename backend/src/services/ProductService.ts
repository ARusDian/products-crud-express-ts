import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ProductInputValidation } from ".";
import { ErrorDetails, ErrorResponse } from "../models";

const prisma = new PrismaClient();

export const getProductsService = async () => {
	return await prisma.product.findMany();
};

export const getProductByIdService = async (id: number) => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"getUser",
				"Invalid id",
				`User id ${id} is invalid`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}

	const product =  await prisma.product.findUnique({
		where: {
			id: id
		}
	});
	if (!product) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getProduct",
				"Product Not Found",
				"Product with the given ID was not found"
			)
		);
	}
	return product;
};

export const createProductService = async (req: Request) => {
	console.log(req.body);
	const product = await ProductInputValidation(req.body, "createProduct");
	return await prisma.product.create({
		data: product
	});
};

export const updateProductService = async (id: number, req: Request) => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"getUser",
				"Invalid id",
				`User id ${id} is invalid`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}

	const product = await getProductByIdService(id);
	if (!product) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"updateProduct",
				"Product Not Found",
				"Product with the given ID was not found"
			)
		);
	}
	const newProduct = await ProductInputValidation(req.body, "updateProduct");
	return await prisma.product.update({
		where: {
			id: id
		},
		data: newProduct
	});
};

export const deleteProductService = async (id: number) => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"getUser",
				"Invalid id",
				`User id ${id} is invalid`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}
	
	const product = await getProductByIdService(id);
	if (!product) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"deleteProduct",
				"Product Not Found",
				"Product with the given ID was not found"
			)
		);
	}
	return await prisma.product.delete({
		where: {
			id: id
		}
	});
};
