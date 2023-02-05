import { BaseUserModel, ErrorDetails, ErrorResponse } from "../../models";
import { getUserByEmailService } from "../UserService";
import argon2 from "argon2";

export const UserInputValidation = async (newUser: BaseUserModel, errorName : string) => { 
	const { name, email, password } = newUser;
	if (!name || !email || !password) {
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
	if (!email.includes("@")) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Invalid email"
			)
		);
	}
	const user = await getUserByEmailService(email);
	if (user) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				errorName,
				"Validation Error",
				"Email already exists"
			)
		);
	}
	const hashedPassword = await argon2.hash(password);
	return {
		name: name,
		email: email,
		password: hashedPassword,
	};
};
