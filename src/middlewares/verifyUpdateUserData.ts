import { NextFunction, Request, Response } from 'express';
import { emailRegex } from './verifyCreateUserData';

export function verifyUpdateUserData(req: Request, res: Response, next: NextFunction) {
	const { name, email, age } = req.body;
	if (!name && !email && !age) {
		return res.status(400).json({
			success: false,
			message: 'There must be at least one value to update',
		});
	}
	if (name && (typeof name !== 'string' || name.length < 3)) {
		return res.status(400).json({
			success: false,
			message: 'Name must be a string and be at least 3 characters',
		});
	}
	if (email && !emailRegex.test(email)) {
		return res.status(400).json({
			success: false,
			message: 'Email must be valid email address',
		});
	}
	if (age && (typeof age !== 'number' || age < 18)) {
		return res.status(400).json({
			success: false,
			message: 'Age must be a number and at least 18',
		});
	}
	next();
}
