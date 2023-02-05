import { ErrorResponse } from "../models";
import { NextFunction, Request, Response } from "express";
import * as logger from "./Logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error | typeof ErrorResponse, request: Request, response: Response, _next : NextFunction) => {
	if (error instanceof ErrorResponse) {
		response.status(error.code).json(error);
		return;
	}

	logger.error("errorHandler: ", error);

	response.status(500).json(
		{
			name: error.name,
			message: "Internal Server Error"
		}
	);
};
