import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ProductInputValidation, numberValidation } from ".";
import { ErrorDetails, ErrorResponse, UserAuthInfoRequest } from "../models";

const prisma = new PrismaClient();

export const getProductsService = async (roleId: number | undefined, userId: number | undefined) => {
	if (!roleId || !userId) {
		throw new ErrorResponse(
			401,
			"Unauthorized",
			new ErrorDetails(
				"getProducts",
				"Unauthorized",
				"User is not authorized to access this resource"
			)
		);
	}

	if (roleId === 1 || roleId === 2) {
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
		},
		where: {
			userId: userId
		}
	});
};

export const getProductsByIdWithCategoryService = async (
	id: number,
	roleId: number | undefined,
	userId: number | undefined,
	categoriesId: number[],
) => {
	if (!roleId || !userId) {
		throw new ErrorResponse(
			401,
			"Unauthorized",
			new ErrorDetails(
				"getProducts",
				"Unauthorized",
				"User is not authorized to access this resource"
			)
		);
	}

	categoriesId = categoriesId.map((id) => numberValidation(id, "getProductsByCategoryId", "Category id"));

	if (roleId === 1 || roleId === 2) {
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
			},
			where: {
				AND: [
					{
						categories: {
							some: {
								id: {
									in: categoriesId
								}
							}
						},
					},
					{
						id: id
					}
				]
			}
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
		},
		where: {
			AND: [
				{
					userId: userId
				},
				{
					categories: {
						some: {
							id: {
								in: categoriesId
							}
						}
					}
				},
				{
					id: id
				}
			]
		}
	});
};

export const getProductByIdService = async (id: number, roleId: number | undefined, userId: number | undefined) => {
	if (!roleId || !userId) {
		throw new ErrorResponse(
			401,
			"Unauthorized",
			new ErrorDetails(
				"getProducts",
				"Unauthorized",
				"User is not authorized to access this resource"
			)
		);
	}

	id = numberValidation(id, "deleteRole", "Product id");

	const product = await prisma.product.findFirst({
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
		},
		where: {
			AND: [
				{
					id: id
				},
				{
					userId: userId
				}
			]
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
	const product = await getProductByIdService(id, req.roleId, req.userId);

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

export const deleteProductService = async (id: number, roleId: number | undefined, userId: number | undefined) => {
	const product = await getProductByIdService(id, roleId, userId);

	return await prisma.product.delete({
		where: {
			id: product.id
		}
	});
};
