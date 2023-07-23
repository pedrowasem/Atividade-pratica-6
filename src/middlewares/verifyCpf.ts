import { NextFunction, Request, Response } from 'express';

export function verifyCpf(req: Request, res: Response, next: NextFunction) {
	const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
	const { cpf } = req.body;

	if (cpf && !cpfRegex.test(cpf)) {
		return res.status(400).json({ message: 'CPF inválido' });
	}

	return next();
}
