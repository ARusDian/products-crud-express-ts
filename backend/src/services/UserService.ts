import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { UserInputValidation, numberValidation } from ".";
import { ErrorResponse, ErrorDetails, UserModel } from "../models";

const prisma = new PrismaClient();

export const getUsersService = async () => {
	return await prisma.user.findMany({
		include: {
			role: true
		},
	});
};

export const getUserByIdService = async (id: number | string) : Promise<UserModel> => {
	id = numberValidation(id, "getUser", "User id");

	const user = await prisma.user.findUnique({
		where: {
			id: id
		},
		include: {
			role: true
		}
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
	const { name, email, password, roleId } = await UserInputValidation(req.body, "createUser");
	
	return await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: password,
			role: {
				connect: {
					id: roleId || 2
				}
			}
		}
	});
};

export const updateUserService = async (id: number | string, req: Request) => {
	const user = await getUserByIdService(id);

	const { name, email, password, roleId } = await UserInputValidation(req.body, "updateUser");
	
	return await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			name: name,
			email: email,
			password: password,
			role: {
				connect: {
					id: roleId || 2
				}
			}
		}
	});
};

export const deleteUserService = async (id: number | string) => {
	const user = await getUserByIdService(id);

	return await prisma.user.delete({
		where: {
			id: user.id
		}
	});
};
