import { ErrorResponse, ErrorDetails } from "../../models";

export const numberValidation = (id: string | number, errorName : string, inputName : string) => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Invalid number",
				`${inputName} is not a number`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}
	return id;
};
