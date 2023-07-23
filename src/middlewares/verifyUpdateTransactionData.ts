import { NextFunction, Request, Response } from 'express';

export function verifyUpdateTransactionData(req: Request, res: Response, next: NextFunction) {
	const { title, value, type } = req.body;
	if (!title && !value && !type) {
		return res.status(400).json({
			success: false,
			message: 'There must be at least one value to update',
		});
	}
	if (title && (typeof title !== 'string' || title.length < 3)) {
		return res.status(400).json({
			success: false,
			message: 'Title must be a string and have at least 3 characters',
		});
	}

	if (value && (typeof value !== 'number' || value <= 0)) {
		return res.status(400).json({
			success: false,
			message: 'Value must be a number and be greater than zero',
		});
	}

	if (type && type !== 'income' && type !== 'outcome') {
		return res.status(400).json({
			success: false,
			message: 'Type must be income or outcome',
		});
	}
	next();
}
