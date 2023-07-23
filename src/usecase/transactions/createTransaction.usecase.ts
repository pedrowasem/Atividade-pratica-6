import { CreateTransactionDTO, Transaction } from '../../classes/transaction.class';
import { TransactionsRepository } from '../../repository/transaction.repository';

type CreateReturn = {
	success: boolean;
	message: string;
	transaction: Transaction;
};

export class CreateTransaction {
	private userIndex: number;
	private data: CreateTransactionDTO;

	constructor(userIndex: number, data: CreateTransactionDTO) {
		this.userIndex = userIndex;
		this.data = data;
	}

	public execute(): CreateReturn {
		const repository = new TransactionsRepository();
		const newTransaction = repository.createTransaction(this.data, this.userIndex);

		return {
			success: true,
			message: 'Transaction created successfully',
			transaction: newTransaction,
		};
	}
}
