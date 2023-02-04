import argon2 from "argon2";
import { getUserByEmailService, getUsersService, registerUserService, getUserByIdService, deleteUserService } from "../services";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserAuthInfoRequest } from "../models";

export const getUsers = async (req: UserAuthInfoRequest, res: Response) => {
	try {
		const users = await getUsersService();
		res.status(200).json(users);
	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });
	}
};

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, confirmPassword } = req.body;
		if (!name || !email || !password || !confirmPassword) {
			res.status(400).json({ message: "All fields are required" });
		}
		if (password !== confirmPassword) {
			res.status(400).json({ message: "Passwords do not match" });
		}
		if (password.length < 6) {
			res.status(400).json({ message: "Password must be at least 6 characters long" });
		}
		if (!email.includes("@")) {
			res.status(400).json({ message: "Invalid email" });
		}
		const user = await getUserByEmailService(email);
		if (user) {
			res.status(400).json({ message: "User already exists" });
		}

		const newUser = await registerUserService(req.body);
		const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: "3h" });
		res.status(201).json({ token: token, name: newUser.name, email: newUser.email });

	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });

	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (!email.includes("@")) {
			return res.status(400).json({ message: "Invalid email" });
		}
		const user = await getUserByEmailService(email);
		if (!user || user === null) {
			return res.status(400).json({ message: "User does not exist" });
		}
		if (!await argon2.verify(user.password, password)) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "3h" });
		res.status(200).json({ token: token, name: user.name, email: user.email });
	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (!email.includes("@")) {
			return res.status(400).json({ message: "Invalid email" });
		}
		const user = await getUserByEmailService(email);
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}
		const newUser = await registerUserService(req.body);
		res.status(201).json(newUser);
	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });
	}
};

export const getUser = async (req: UserAuthInfoRequest, res: Response) => {
	try {
		const user = await getUserByIdService(req.params.id);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		res.status(200).json(user);
	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });
	}
};

export const updateUser = async (req: UserAuthInfoRequest, res: Response) => {
	try {
		const user = await getUserByIdService(req.params.id);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		const updatedUser = await registerUserService(req.body);
		res.status(200).json(updatedUser);
	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });
	}
};

export const deleteUser = async (req: UserAuthInfoRequest, res: Response) => {
	try {
		const user = await getUserByIdService(req.params.id);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		await deleteUserService(user.id);
		res.status(200).json({ message: "User deleted successfully" });
	}
	catch (error) {
		let message = "Something went wrong";
		if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message: message });
	}
};

