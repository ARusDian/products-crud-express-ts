import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ErrorResponse, ErrorDetails, UserAuthInfoRequest, OrderModel } from "../models";
import { numberValidation, orderInputValidation } from ".";


const prisma = new PrismaClient();

export const getOrdersService = async (req: UserAuthInfoRequest) => {
	const { userId, roleId } = req;

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
		return await prisma.order.findMany({
			select: {
				id: true,
				userId: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true
					}
				},
				products: {
					select: {
						id: true,
						name: true,
						price: true,
						categories: {
							select: {
								name: true
							}
						}
					}
				}
			}
		});
	}

	return await prisma.order.findMany({
		where: {
			userId: userId
		},
		select: {
			id: true,
			userId: true,
			user: {
				select: {
					id: true,
					name: true,
					email: true
				}
			},
			products: {
				select: {
					id: true,
					name: true,
					price: true,
					categories: {
						select: {
							name: true
						}
					}
				}
			}
		},
	});
};

export const getOrderByIdService = async (id: number | string, req: UserAuthInfoRequest) => {
	const { userId, roleId } = req;

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

	id = numberValidation(id, "getOrder", "Order id");
	
	let order: OrderModel | null;
	if (roleId === 1 || roleId === 2) {
		order = await prisma.order.findUnique({
			where: {
				id: id
			},
			select: {
				id: true,
				userId: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true
					}
				},
				products: {
					select: {
						id: true,
						name: true,
						price: true,
						categories: {
							select: {
								name: true
							}
						}
					}
				}
			}
		});
	} else {
		order = await prisma.order.findFirst({
			where: {
				AND: [
					{
						id: id
					}, {
						userId: userId
					}
				]
			}
			,
			select: {
				id: true,
				userId: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true
					}
				},
				products: {
					select: {
						id: true,
						name: true,
						price: true,
						categories: {
							select: {
								name: true
							}
						}
					}
				}
			}
		});
	}

	if (!order) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getOrder",
				"Order not found",
				`Order with id ${id} not found`
			)
		);
	}
	return order;
};

export const getUserByIdWithOrderService = async (id: number | string) => {
	id = numberValidation(id, "getUserByIdWithOrder", "User id");

	const user = await prisma.user.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			email: true,
			orders: {
				select: {
					id: true,
					userId: true,
					products: {
						select: {
							id: true,
							name: true,
							price: true,
							categories: {
								select: {
									name: true
								}
							}
						}
					}
				}
			}
		}
	});

	if (!user) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getUserByIdWithOrder",
				"User not found",
				`User with id ${id} not found`
			)
		);
	}
	return user;
};

export const createOrderService = async (req: Request) => {
	const order = await orderInputValidation(req.body, "createOrder");

	return prisma.order.create({
		data: {
			user: {
				connect: {
					id: order.userId
				}
			},
			products: {
				connect: order.products.map((product) => {
					return {
						id: product.id
					};
				})
			}
		}
	});
};

export const updateOrderService = async (id: number | string, req: UserAuthInfoRequest) => {
	id = numberValidation(id, "updateOrder", "Order id");

	const OrderExists = await getOrderByIdService(id, req);

	const order = await orderInputValidation(req.body, "updateOrder");

	return await prisma.order.update({
		where: {
			id: OrderExists.id
		},
		data: {
			user: {
				connect: {
					id: order.userId
				}
			},
			products: {
				connect: order.products.map((product) => {
					return {
						id: product.id
					};
				})
			}
		}
	});
};

export const deleteOrderService = async (id: number | string, req : UserAuthInfoRequest) => {
	id = numberValidation(id, "deleteOrder", "Order id");

	const order = await getOrderByIdService(id, req);

	return await prisma.order.delete({
		where: {
			id: order.id
		}
	});
};
