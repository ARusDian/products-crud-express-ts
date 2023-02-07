import { numberValidation } from ".";
import { getProductsService, getUsersService } from "..";
import { OrderModel, ErrorDetails, ErrorResponse } from "../../models";

export const orderInputValidation = async (order: OrderModel, errorName: string) => { 
	order.userId = numberValidation(order.userId, errorName, "Order : User id");
	order.products.forEach((product) => {
		product.id = numberValidation(product.id, errorName, "Order : Product id");
	});

	const usersId =  (await getUsersService()).map((user) => user.id);

	if (!usersId.includes(order.userId)) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				errorName,
				"User not found",
				`User with id ${order.userId} not found`
			)
		);
	}

	const productsId = (await getProductsService()).map((product) => product.id);

	order.products.forEach((product) => {
		if (!productsId.includes(product.id)) {
			throw new ErrorResponse(
				404,
				"Not Found",
				new ErrorDetails(
					errorName,
					"Product not found",
					`Product with id ${product.id} not found`
				)
			);
		}
	});
	

	return order;
};
