import { Request, Response, NextFunction } from "express";
import { createRoleService, deleteRoleService, getRoleByIdService, getRoleByIdWithUsersService, getRolesService, updateRoleService } from "../services";
import { DataDetailResponse, RoleModel, SuccessResponse } from "../models";

export const createRole = async (req: Request, res: Response,next: NextFunction) => {
	try {
		const role = await createRoleService(req);
		const response = new SuccessResponse<RoleModel>(
			201,
			"Created",
			new DataDetailResponse<RoleModel>(
				"roles",
				role
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const roles = await getRolesService();
		const response = new SuccessResponse<RoleModel[]>(
			200,
			"OK",
			new DataDetailResponse<RoleModel[]>(
				"roles",
				roles
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
};

export const getRoleById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const role = await getRoleByIdService(req.params.id);
		const response = new SuccessResponse<RoleModel>(
			200,
			"OK",
			new DataDetailResponse<RoleModel>(
				"roles",
				role
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
};

export const getRolebyIdwithUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const role = await getRoleByIdWithUsersService(req.params.id);
		const response = new SuccessResponse<RoleModel[]>(
			200,
			"OK",
			new DataDetailResponse<RoleModel[]>(
				"roles",
				role
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const role = await updateRoleService(req.params.id, req);
		const response = new SuccessResponse<RoleModel>(
			200,
			"OK",
			new DataDetailResponse<RoleModel>(
				"roles",
				role
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const role = await deleteRoleService(req.params.id);
		const response = new SuccessResponse<RoleModel>(
			200,
			"OK",
			new DataDetailResponse<RoleModel>(
				"roles",
				role
			)
		);
		return res.status(response.code).json(response);
	} catch (error) {
		next(error);
	}
};

