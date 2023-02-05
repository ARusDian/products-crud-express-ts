import { BaseProductModel, ErrorDetails, ErrorResponse } from "../../models";

interface ProductInput extends BaseProductModel {
	userId: number;
}

export const ProductInputValidation = async (product: ProductInput, errorName : string) => {
	if (!product.name || !product.price) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"All fields are required"
			)
		);
	}
	if (product.userId === undefined) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"User Id is required"
			)
		);
	}
	if (isNaN(Number(product.price))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Price must be a number"
			)
		);
	}

	if (typeof product.price === "string") {
		product.price = parseInt(product.price);
	}

	if (product.price < 0) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Price must be greater than 0"
			)
		);
	}
	return product;
};
