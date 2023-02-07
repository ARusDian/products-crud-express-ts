import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ProductInputValidation, numberValidation } from ".";
import { ErrorDetails, ErrorResponse, UserAuthInfoRequest } from "../models";

const prisma = new PrismaClient();

export const getProductsService = async (req?: Request) => {

	if (req && req.query.categoriesId) {
		const categoriesId = req.query.categoriesId as string;
		const categoriesIdArray = categoriesId.split(",").map(
			(id) => numberValidation(id, "getProducts", "categoriesId")
		);

		return await prisma.product.findMany({
			select: {
				id: true,
				name: true,
				price: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true
					}
				},
				categories: {
					select: {
						name: true
					}
				}
			},
			where: {
				categories: {
					some: {
						id: {
							in: categoriesIdArray
						}
					}
				},
			},
		});
	}

	return await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			user: {
				select: {
					name: true,
					email: true
				}
			},
			categories: {
				select: {
					name: true
				}
			}
		}
	});
};

export const getProductByIdService = async (id: number) => {
	id = numberValidation(id, "deleteRole", "Product id");

	const product = await prisma.product.findFirst({
		select: {
			id: true,
			name: true,
			price: true,
			user: {
				select: {
					id: true,
					name: true,
					email: true
				}
			},
			categories: {
				select: {
					name: true
				}
			}
		},
		where:
		{
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
	const {
		name,
		price,
		userId,
		categoriesId
	} = await ProductInputValidation(req.body, "createProduct");

	return await prisma.product.create({
		data: {
			name,
			price,
			user: {
				connect: {
					id: userId
				}
			},
			categories: {
				connect: categoriesId.map((id) => {
					return {
						id: id
					};
				}),
			}
		}
	});
};

export const updateProductService = async (id: number, req: UserAuthInfoRequest) => {
	const product = await getProductByIdService(id);

	if (product.user.id !== req.userId && req.roleId !== 1 && req.roleId !== 2) {
		throw new ErrorResponse(
			403,
			"Forbidden",
			new ErrorDetails(
				"updateProduct",
				"Access Denied",
				"You are not allowed to update this product"
			)
		);
	}

	const {
		name,
		price,
		userId,
		categoriesId
	} = await ProductInputValidation(req.body, "updateProduct");

	return await prisma.product.update({
		where: {
			id: product.id
		},
		data: {
			name,
			price,
			user: {
				connect: {
					id: userId
				}
			},
			categories: {
				connect: categoriesId.map((id) => {
					return {
						id: id
					};
				}),
			}
		}
	});
};

export const deleteProductService = async (id: number, req: UserAuthInfoRequest) => {
	const product = await getProductByIdService(id);

	if (product.user.id !== req.userId && req.roleId !== 1 && req.roleId !== 2) {
		throw new ErrorResponse(
			403,
			"Forbidden",
			new ErrorDetails(
				"deleteProduct",
				"Access Denied",
				"You are not allowed to delete this product"
			)
		);
	}

	return await prisma.product.delete({
		where: {
			id: product.id
		}
	});
};
