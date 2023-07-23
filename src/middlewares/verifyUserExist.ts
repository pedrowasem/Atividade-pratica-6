import { NextFunction, Request, Response } from 'express';
import { users } from '../database';

export function verifyUserExists(req: Request, res: Response, next: NextFunction) {
	const { cpf } = req.body;
	const user = users.find((user) => user.cpf === cpf);
	if (user) {
		return res.status(400).json({ error: 'CPF já cadastrado' });
	}
	return next();
}
