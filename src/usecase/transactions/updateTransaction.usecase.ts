import { CreateTransactionDTO, Transaction } from '../../classes/transaction.class';
import { TransactionsRepository } from '../../repository/transaction.repository';

type UpdateReturn = {
	success: boolean;
	message: string;
	transaction?: Transaction;
};

export type UpdateTransactionsDTO = CreateTransactionDTO & {
	userIndex: number;
	transactionIndex: number;
};

export class UpdateTransaction {
	constructor(private data: UpdateTransactionsDTO) {
		this.data = data;
	}

	public execute(): UpdateReturn {
		const repository = new TransactionsRepository();

		const transaction = repository.updateTransaction(this.data);

		return {
			success: true,
			message: 'Transaction updated successfully',
			transaction,
		};
	}
}
