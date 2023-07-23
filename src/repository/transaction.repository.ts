import { CreateTransactionDTO, Transaction } from '../classes/transaction.class';
import { users } from '../database';
import { UpdateTransactionsDTO } from '../usecase/transactions';
import { ListTransactionsDTO } from '../usecase/transactions/listTransactions.usecase';

export class TransactionsRepository {
	public createTransaction(data: CreateTransactionDTO, index: number): Transaction {
		const user = users[index];
		const newTransaction = new Transaction(data);
		user.addTransaction(newTransaction);
		return newTransaction;
	}

	public getTransactionById(userIndex: number, id: string): number {
		return users[userIndex].transactions.findIndex((transaction) => transaction.id === id);
	}

	public listTransactions(
		userIndex: number,
		data: Omit<CreateTransactionDTO, 'value'>
	): ListTransactionsDTO {
		const { title, type } = data;

		let filteredTransactions = users[userIndex].transactions;
		if (title) {
			filteredTransactions = filteredTransactions.filter((transaction) =>
				transaction.title.includes(title as string)
			);
		}
		if (type) {
			filteredTransactions = filteredTransactions.filter(
				(transaction) => transaction.type === type
			);
		}
		const income = filteredTransactions
			.filter((transaction) => transaction.type === 'income')
			.reduce((total, transaction) => total + transaction.value, 0);

		const outcome = filteredTransactions
			.filter((transaction) => transaction.type === 'outcome')
			.reduce((total, transaction) => total + transaction.value, 0);

		const total = income - outcome;

		return {
			transactions: filteredTransactions,
			balance: { income, outcome, total },
		};
	}

	public listTransaction(userIndex: number, transactionIndex: number): Transaction {
		return users[userIndex].transactions[transactionIndex];
	}

	public deleteTransaction(userIndex: number, transactionIndex: number): Transaction {
		return users[userIndex].transactions.splice(transactionIndex, 1)[0];
	}

	public updateTransaction(data: UpdateTransactionsDTO): Transaction {
		const transaction = users[data.userIndex].transactions[data.transactionIndex];
		transaction.updateTransaction(data);
		return transaction;
	}
}
