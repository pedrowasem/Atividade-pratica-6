import { NextFunction, Request, Response } from 'express';
import { users } from '../database';

export function verifyTransaction(req: Request, res: Response, next: NextFunction) {
	const userIndex: number = +req.body.userIndex;

	const transactions = users[userIndex].transactions;

	const { id } = req.params;
	const index = transactions.findIndex((transactions) => transactions.id === id);
	if (index === -1) {
		return res.status(404).json({ error: 'Transação não encontrada' });
	}
	req.body.transactionIndex = index;

	return next();
}
