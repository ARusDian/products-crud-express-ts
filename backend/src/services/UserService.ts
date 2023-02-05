import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { UserInputValidation } from ".";
import { ErrorResponse, ErrorDetails, UserModel } from "../models";

const prisma = new PrismaClient();

export const getUsersService = async () => {
	return await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			password: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};

export const getUserByIdService = async (id: number | string) : Promise<UserModel> => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"getUser",
				"Invalid id",
				`User id ${id} is invalid`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}

	const user = await prisma.user.findUnique({
		where: {
			id: id
		},
	});

	if (!user) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getUser",
				"User not found",
				`User with id ${id} not found`
			)
		);
	}
	return user;
};

export const getUserByEmailService = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email
		},
		select: {
			id: true,
			name: true,
			email: true,
			password: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};

export const createUserService = async (req: Request) => {
	const user = await UserInputValidation(req.body, "createUser");
	return await prisma.user.create({
		data: user
	});
};

export const updateUserService = async (id: number | string, req: Request) => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"getUser",
				"Invalid id",
				`User id ${id} is invalid`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}

	const user = await getUserByIdService(id);
	if (!user) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"updateUser",
				"User not found",
				`User with id ${req.params.id} not found`
			)
		);
	}
	const newUser = await UserInputValidation(req.body, "updateUser");
	return await prisma.user.update({
		where: {
			id: id
		},
		data: newUser
	});
};

export const deleteUserService = async (id: number | string) => {
	if (isNaN(Number(id))) {
		throw new ErrorResponse(
			400,
			"Bad Request",
			new ErrorDetails(
				"getUser",
				"Invalid id",
				`User id ${id} is invalid`
			)
		);
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}

	const user = await getUserByIdService(id);
	if (!user) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"deleteUser",
				"User not found",
				`User with id ${id} not found`
			)
		);
	}
	return await prisma.user.delete({
		where: {
			id: id
		}
	});
};
