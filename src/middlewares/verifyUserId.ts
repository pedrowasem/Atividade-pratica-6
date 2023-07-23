import { NextFunction, Request, Response } from 'express';
import { users } from '../database';

export function verifyUserId(req: Request, res: Response, next: NextFunction) {
	const { userId } = req.params;
	const index = users.findIndex((user) => user.id === userId);
	if (index === -1) {
		return res.status(404).json({ error: 'Usuário não encontrado' });
	}
	req.body.userIndex = index;

	return next();
}
