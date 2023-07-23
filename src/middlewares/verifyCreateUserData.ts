import { NextFunction, Request, Response } from 'express';

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export function verifyCreateUserData(req: Request, res: Response, next: NextFunction) {
	const { name, cpf, email, age } = req.body;

	if (!name || !cpf || !email || !age) {
		return res.status(400).json({
			success: false,
			message: 'Name, cpf, email and age are required',
		});
	}

	if (typeof name !== 'string' || name.length < 3) {
		return res.status(400).json({
			success: false,
			message: 'Name must be a string and have at least 3 characters',
		});
	}

	if (!emailRegex.test(email)) {
		return res.status(400).json({
			success: false,
			message: 'Email must be a valid email address',
		});
	}

	if (typeof age !== 'number' || age < 18) {
		return res.status(400).json({
			success: false,
			message: 'Age must be a number and be at leats 18',
		});
	}

	next();
}
