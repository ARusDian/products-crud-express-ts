import { Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { getUserByIdService } from "../services";
import { AuthToken, ErrorResponse, ErrorDetails, UserAuthInfoRequest } from "../models";

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
		const verifyToken = (token: string) => {
			try {
				return jwt.verify(token, process.env.JWT_SECRET as string);
			} catch (error) {
				if (error instanceof TokenExpiredError) {
					throw new ErrorResponse(
						401,
						"Unauthorized",
						new ErrorDetails(
							"VerifyUserError",
							"Token Error",
							"Token has expired"
						)
					);
				}
				if (error instanceof NotBeforeError) {
					throw new ErrorResponse(
						401,
						"Unauthorized",
						new ErrorDetails(
							"VerifyUserError",
							"Token Error",
							"Token is not valid yet"
						)
					);
				}
				if (error instanceof JsonWebTokenError) {
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
		};

		const decodedToken = verifyToken(token.split(" ")[1]);

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
		req.roleId = user.role?.id;
		next();

	} catch (error) {
		next(error);
	}
};
