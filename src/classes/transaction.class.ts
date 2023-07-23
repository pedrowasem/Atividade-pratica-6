import { randomUUID as UUID } from 'node:crypto';

export type TransactionTypeDTO = 'income' | 'outcome';

export type CreateTransactionDTO = {
	title: string;
	value: number;
	type: TransactionTypeDTO;
};

export type TransactionDTO = {
	id: string;
	title: string;
	value: number;
	type: TransactionTypeDTO;
};

export class Transaction {
	#id: string;
	#title: string;
	#value: number;
	#type: TransactionTypeDTO;

	constructor(data: CreateTransactionDTO) {
		this.#id = UUID();
		this.#title = data.title;
		this.#value = data.value;
		this.#type = data.type;
	}

	get id(): string {
		return this.#id;
	}

	get title(): string {
		return this.#title;
	}
	get value(): number {
		return this.#value;
	}
	get type(): 'income' | 'outcome' {
		return this.#type;
	}

	public toJSON() {
		const transaction = {
			id: this.#id,
			title: this.#title,
			value: this.#value,
			type: this.#type,
		};

		return transaction;
	}

	public updateTransaction(data: CreateTransactionDTO) {
		this.#title = data.title ?? this.#title;
		this.#value = data.value ?? this.#value;
		this.#type = data.type ?? this.#type;
	}
}
