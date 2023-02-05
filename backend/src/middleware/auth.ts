import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByIdService } from "../services";
import { AuthToken, ErrorResponse, UserAuthInfoRequest, ErrorDetails } from "../models";

export const verifyUser = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.get("authorization");
		if (!token || !token.toLowerCase().startsWith("bearer ")) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					"Token Error",
					"Please login to continue"
				)
			);
		}
		const decodedToken = jwt.verify(token.substring(7), process.env.JWT_SECRET as string);
		if (!decodedToken) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					"Token Error",
					"Invalid token"
				)
			);
		}
		const user = await getUserByIdService((decodedToken as AuthToken).id);

		if (!user) {
			throw new ErrorResponse(
				401,
				"Unauthorized",
				new ErrorDetails(
					"VerifyUserError",
					"Athentication Error",
					"User does not exist"
				)
			);
		}
		req.userId = user.id;
		next();

	} catch (error) {
		next(error);
	}
};
