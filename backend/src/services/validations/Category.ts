import { BaseCategoryModel, ErrorDetails, ErrorResponse } from "../../models";
export const categoryInputValidation = (req: BaseCategoryModel) => {
	const { name } = req;
	if (!name) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"addRole",
				"Validation Error",
				"All fields are required"
			)
		);
	}
	if (typeof name !== "string") {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"addRole",
				"Validation Error",
				"Name must be a string"
			)
		);
	}
	if (name.length < 3) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"addRole",
				"Validation Error",
				"Role must be greater than 3 characters long"
			)
		);
	}
	if (name.length > 20) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"addRole",
				"Validation Error",
				"Role must be less than 20 characters long"
			)
		);
	}
	return { name };
};
