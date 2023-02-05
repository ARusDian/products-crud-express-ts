import { Response, NextFunction } from "express";
import { getUserByIdService } from "../services";
import { ErrorResponse, ErrorDetails, UserAuthInfoRequest } from "../models";


export const adminOnly = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const role = await getRole(req);

		if (role !== 1 && role !== 2) { 
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"AdminOnly",
					"AdminOnly",
					"User is not authorized to access this resource"
				)
			);
		}

		next();
	} catch (error) {
		next(error);
	}
};

const getRole = async (req: UserAuthInfoRequest) => {
	if (req.roleId) {
		return req.roleId;
	}
	if (!req.userId) {
		throw new ErrorResponse(
			401,
			"Unauthorized",
			new ErrorDetails(
				"Unauthorized",
				"AdminOnly",
				"User is not authorized to access this resource"
			)
		);
	}
	if (req.userId) {
		const user = await getUserByIdService(req.userId);
		if (user) {
			return user.role?.id;
		}
	}
	return undefined;
};
