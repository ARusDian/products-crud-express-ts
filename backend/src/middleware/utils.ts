import * as logger from "./logger";
import { Request, Response, NextFunction } from "express";

export const requestLogger = (request : Request, response : Response, next : NextFunction) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("Response:  ", response);
	logger.info("---");
	next();
};

export const unknownEndpoint = (request : Request, response : Response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (error : Error, request: Request, response: Response, next: NextFunction) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({
			error: "invalid token"
		});
	}

	next(error);
};
