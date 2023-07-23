import { Request, Response } from 'express';
import {
	CreateTransaction,
	DeleteTransaction,
	ListTransaction,
	ListTransactions,
	UpdateTransaction,
} from '../../usecase/transactions';
export class TransactionsController {
	public createTransaction(req: Request, res: Response) {
		const userIndex = req.body.userIndex;
		const data = req.body;

		const usecase = new CreateTransaction(userIndex, data);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(200).json(response);
	}

	public listTransaction(req: Request, res: Response) {
		const { userIndex, transactionIndex } = req.body;

		const usecase = new ListTransaction(userIndex, transactionIndex);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(200).json(response);
	}
	public listTransactions(req: Request, res: Response) {
		const { userIndex } = req.body;

		const data = req.body;

		const usecase = new ListTransactions(data, userIndex);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(200).json(response);
	}
	public deleteTransaction(req: Request, res: Response) {
		const { userIndex, transactionIndex } = req.body;

		const usecase = new DeleteTransaction(userIndex, transactionIndex);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(200).json(response);
	}
	public updateTransaction(req: Request, res: Response) {
		const data = req.body;

		const usecase = new UpdateTransaction(data);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(200).json(response);
	}
}
