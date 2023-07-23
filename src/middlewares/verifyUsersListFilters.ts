import { NextFunction, Request, Response } from 'express';
import { emailRegex } from './verifyCreateUserData';

export function verifyUsersListFilters(req: Request, res: Response, next: NextFunction) {
	const { name, email } = req.body;
	if (name && typeof name !== 'string') {
		return res.status(400).json({
			success: false,
			message: 'Name must be a string',
		});
	}
	if (email && !emailRegex.test(email)) {
		return res.status(400).json({
			success: false,
			message: 'Email must be valid email address',
		});
	}
	next();
}
