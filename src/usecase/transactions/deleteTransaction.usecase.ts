import { Transaction } from '../../classes/transaction.class';
import { TransactionsRepository } from '../../repository/transaction.repository';

type DeleteReturn = {
	success: boolean;
	message: string;
	transaction?: Transaction;
};

export class DeleteTransaction {
	private userIndex: number;
	private transactionIndex: number;

	constructor(userIndex: number, transactionIndex: number) {
		this.userIndex = userIndex;
		this.transactionIndex = transactionIndex;
	}

	public execute(): DeleteReturn {
		const repository = new TransactionsRepository();

		const transaction = repository.deleteTransaction(this.userIndex, this.transactionIndex);

		return {
			success: true,
			message: 'Transaction deleted successfully',
			transaction,
		};
	}
}
