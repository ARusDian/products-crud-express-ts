import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByIdService } from "../services";
import { UserAuthInfoRequest } from "../models";

interface TokenPayload { 
	id: number;
}

export const verifyUser = async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
	const token = req.get("authorization");
	if (!token || !token.toLowerCase().startsWith("bearer ")) {
		return res.status(401).json({ msg: "Please Login to your account!" });
	}
	const decodedToken = jwt.verify(token.substring(7), process.env.JWT_SECRET as string);
	if (!decodedToken) {
		return res.status(401).json({ msg: "Token not Valid!" });
	}
	const user = await getUserByIdService((decodedToken as TokenPayload).id);

	if (!user) {
		return res.status(401).json({ msg: "Account not Found!" });
	}
	req.userId = user.id;

	next();
};
