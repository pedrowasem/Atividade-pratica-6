import { CreateTransactionDTO, Transaction } from '../../classes/transaction.class';
import { TransactionsRepository } from '../../repository/transaction.repository';
export type ListTransactionsDTO = {
	transactions: Transaction[];
	balance: {
		income: number;
		outcome: number;
		total: number;
	};
};
type ListTransactionsReturn = {
	success: boolean;
	message: string;
	transactions?: ListTransactionsDTO;
};
export class ListTransactions {
	private data: CreateTransactionDTO;
	private userIndex: number;

	constructor(data: CreateTransactionDTO, userIndex: number) {
		this.data = data;
		this.userIndex = userIndex;
	}

	public execute(): ListTransactionsReturn {
		const repository = new TransactionsRepository();

		const transactions = repository.listTransactions(this.userIndex, this.data);

		return {
			success: true,
			message: 'Transaction listed successfully',
			transactions,
		};
	}
}
