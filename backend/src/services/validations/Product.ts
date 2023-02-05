import { BaseProductModel, ErrorDetails, ErrorResponse } from "../../models";
import { getCategoriesService, getUsersService } from "../.";

interface ProductInput extends BaseProductModel {
	userId: number;
	categoriesId: number[];
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
	const usersId = await (await getUsersService()).map((user) => user.id);

	if (!usersId.includes(product.userId)) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"User does not exist"
			)
		);
	}

	if (product.categoriesId === undefined || product.categoriesId.length < 1) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Category field is required"
			)
		);
	}

	const categoriesId = await (await getCategoriesService()).map((category) => category.id);
	product.categoriesId.forEach((categoryId) => {
		if (!categoriesId.includes(categoryId)) {
			throw new ErrorResponse(
				400,
				"Bad Request",
				new ErrorDetails(
					errorName,
					"Validation Error",
					"Product category does not exist"
				)
			);
		}
	});

	return product;
};
