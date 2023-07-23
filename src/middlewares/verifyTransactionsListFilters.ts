import { NextFunction, Request, Response } from 'express';

export function verifyTransactionsListFilters(req: Request, res: Response, next: NextFunction) {
	const { title, type } = req.body;
	if (title && typeof title !== 'string') {
		return res.status(400).json({
			success: false,
			message: 'Title must be a string and be at least 3 characters',
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
