import { Request } from "express";
import { createUserService, getUserByEmailService, getUserByIdService } from ".";
import { AuthToken, ErrorDetails, ErrorResponse } from "../models";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const registerService = async (req: Request) => {
	const { name, email, password, confirmPassword } = req.body;
	if (!name || !email || !password || !confirmPassword) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"All fields are required"
			)
		);
	}
	if (password !== confirmPassword) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"Passwords do not match"
			)
		);
	}
	if (password.length < 6) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
				"Validation Error",
				"Password must be at least 6 characters"
			)
		);
	}
	if (!email.includes("@")) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"RegisterError",
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
				"RegisterError",
				"Validation Error",
				"User already exists"
			)
		);
	}
	const newUser = await createUserService(req);
	if (!newUser) {
		throw new ErrorResponse(
			500,
			"Internal Server Error",
			new ErrorDetails(
				"RegisterError",
				"Internal Server Error",
				"Something wrong went creating user"
			)
		);
	}
	const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: "3h" });
	return { token, data : {name: newUser.name, email: newUser.email} };
};

export const loginService = async (req: Request) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "LoginError",
				message: "Validation Error",
				details: "All fields are required"
			}
		);
	}
	if (!email.includes("@")) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "LoginError",
				message: "Validation Error",
				details: "Invalid email"
			}
		);
	}
	const user = await getUserByEmailService(email);
	if (!user || user === null) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "LoginError",
				message: "Validation Error",
				details: "User does not exist"
			}
		);
	}
	
	const isPasswordCorrect = await argon2.verify(user.password, password);
	if (!isPasswordCorrect) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "LoginError",
				message: "Validation Error",
				details: "Invalid credentials"
			}
		);
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "3h" });
	return { token, data: { name: user.name, email: user.email } };
};

export const authenticatedService = async (req: Request) => {
	const token = req.get("authorization");
	if (!token) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "AuthenticatedError",
				message: "Validation Error",
				details: "Token is required"
			}
		);
	}
	const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthToken;
	if (!decoded) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "AuthenticatedError",
				message: "Validation Error",
				details: "Invalid token"
			}
		);
	}
	const user = await getUserByIdService((decoded).id);
	if (!user) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			{
				name: "AuthenticatedError",
				message: "Validation Error",
				details: "User does not exist"
			}
		);
	}
	return user;
};
