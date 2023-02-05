import * as logger from "./Logger";
import { Request, Response, NextFunction } from "express";

export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("Response:  ", response);
	logger.info("---");
	next();
};

