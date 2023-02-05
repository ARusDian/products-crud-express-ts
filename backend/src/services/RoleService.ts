import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ErrorResponse, ErrorDetails } from "../models";
import { RoleInputValidation } from ".";
import { numberValidation } from ".";

const prisma = new PrismaClient();

export const getRolesService = async () => {
	return await prisma.role.findMany();
};

export const getRoleByIdService = async (id: number | string) => {
	id = numberValidation(id, "deleteRole", "Role id");

	const role = await prisma.role.findUnique({
		where: {
			id: id
		}
	});

	if (!role) {
		throw new ErrorResponse(
			404,
			"Not Found",
			new ErrorDetails(
				"getRole",
				"Role not found",
				`Role with id ${id} not found`
			)
		);
	}
	return role;
};

export const getRoleByNameService = async (name: string) => {
	const role = RoleInputValidation({ name });
	
	return await prisma.role.findUnique({
		where: {
			name: role.name
		}
	});
};

export const getRoleByIdWithUsersService = async (id: number | string) => {
	id = numberValidation(id, "getRoleWithUsers", "Role id");

	const role = await getRoleByIdService(id);
	
	return await prisma.role.findMany({
		where: {
			id: role.id
		},
		include: {
			users: true
		}
	});
};

export const createRoleService = async (req : Request) => {
	const role = RoleInputValidation(req.body);

	return await prisma.role.create({
		data: role
	});
};

export const updateRoleService = async (id: number | string, req : Request) => {
	const role = await getRoleByIdService(id);
	
	const newRole = RoleInputValidation(req.body);

	return await prisma.role.update({
		where: {
			id: role.id
		},
		data: newRole
	});
};

export const deleteRoleService = async (id: number | string) => {
	const role = await getRoleByIdService(id);

	return await prisma.role.delete({
		where: {
			id: role.id
		}
	});
};




