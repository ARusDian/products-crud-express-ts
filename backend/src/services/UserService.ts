import { PrismaClient } from "@prisma/client";
import { UserRegistrationModel } from "../models";
import argon2 from "argon2";

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

export const getUserByIdService = async (id: number | string) => {
	if (isNaN(Number(id))) {
		return null;
	}
	if (typeof id === "string") {
		id = parseInt(id);
	}
	return await prisma.user.findUnique({
		where: {
			id: id
		},
	});
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

export const registerUserService = async (userRequest: UserRegistrationModel) => {
	const { name, email, password, confirmPassword} = userRequest;
	if (password !== confirmPassword) {
		throw new Error("Passwords do not match");
	}
	const hashedPassword = await argon2.hash(password);
	return await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: hashedPassword,
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};

export const updateUserService = async (id: number, user: UserRegistrationModel) => {
	user.password = await argon2.hash(user.password);
	return await prisma.user.update({
		where: {
			id: id
		},
		data: user
	});
};

export const deleteUserService = async (id: number) => {
	return await prisma.user.delete({
		where: {
			id: id
		}
	});
};
