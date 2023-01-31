import { PrismaClient } from "@prisma/client";
import { BaseProductModel, ProductModel } from "../types";

const prisma = new PrismaClient();

export const getProductsService = async() => { 
	return await prisma.product.findMany();
};

export const getProductByIdService = async (id: number) => {
	return await prisma.product.findUnique({
		where: {
			id: id
		}
	});
};

export const createProductService = async (product: BaseProductModel) => {
	return await prisma.product.create({
		data: product
	});
};

export const updateProductService = async (id: number, product: ProductModel) => {
	return await prisma.product.update({
		where: {
			id: id
		},
		data: product
	});
};

export const deleteProductService = async (id: number) => {
	return await prisma.product.delete({
		where: {
			id: id
		}
	});
};
