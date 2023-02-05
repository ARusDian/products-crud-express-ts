import { DataDetailResponse, SuccessResponse, UserModel } from "../models";
import {
	getUsersService,
	getUserByIdService,
	deleteUserService,
	createUserService,
	updateUserService
} from "../services";
import { Request, Response, NextFunction } from "express";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await getUsersService();
		const response = new SuccessResponse<UserModel[]>(
			200,
			"OK",
			new DataDetailResponse<UserModel[]>(
				"users",
				users
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await createUserService(req);
		const response = new SuccessResponse<UserModel>(
			201,
			"Created",
			new DataDetailResponse<UserModel>(
				"users",
				user
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await getUserByIdService(req.params.id);
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				user
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedUser = await updateUserService(Number(req.params.id), req);
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				updatedUser
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await deleteUserService(Number(req.params.id));
		const response = new SuccessResponse<UserModel>(
			200,
			"OK",
			new DataDetailResponse<UserModel>(
				"users",
				user
			)
		);
		res.status(response.code).json(response);
		return;
	}
	catch (error) {
		next(error);
	}
};

