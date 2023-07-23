import { TransactionDTO } from '../../classes/transaction.class';
import { TransactionsRepository } from '../../repository/transaction.repository';
type ListTransactionReturn = {
	success: boolean;
	message: string;
	transaction?: TransactionDTO;
};
export class ListTransaction {
	private userIndex: number;
	private transactionIndex: number;

	constructor(userIndex: number, transactionIndex: number) {
		this.userIndex = userIndex;
		this.transactionIndex = transactionIndex;
	}

	public execute(): ListTransactionReturn {
		const repository = new TransactionsRepository();

		const transaction = repository.listTransaction(this.userIndex, this.transactionIndex);

		return {
			success: true,
			message: 'Transaction listed successfully',
			transaction,
		};
	}
}
