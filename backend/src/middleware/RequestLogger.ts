import { ErrorDetails, ErrorResponse } from "../models";
import { NextFunction, Request, Response } from "express";

export const unknownEndpoint = (request: Request, response: Response, next: NextFunction) => {
	new ErrorResponse(
		404,
		"Unknown endpoint",
		new ErrorDetails(
			"unknownEndpoint",
			"Unknown endpoint",
			`Unknown endpoint: ${request.method} ${request.path}`
		)
	);
	next();
};
