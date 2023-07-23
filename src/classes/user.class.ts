import { UpdateUserDTO } from '../usecase/users';
import { Transaction } from './transaction.class';

export type UserDTO = {
	id: string;
	name: string;
	cpf: string;
	email: string;
	age: number;
};

export class User {
	#id: string;
	#name: string;
	#cpf: string;
	#email: string;
	#age: number;
	#transactions: Transaction[];

	constructor(data: UserDTO) {
		this.#id = data.id;
		this.#name = data.name;
		this.#cpf = data.cpf;
		this.#email = data.email;
		this.#age = data.age;
		this.#transactions = [];
	}

	public toJSON() {
		const user = {
			id: this.#id,
			name: this.#name,
			cpf: this.#cpf,
			email: this.#email,
			age: this.#age,
			transactions: this.#transactions,
		};

		return user;
	}

	get id(): string {
		return this.#id;
	}
	get name(): string {
		return this.#name;
	}
	get cpf(): string {
		return this.#cpf;
	}
	get email(): string {
		return this.#email;
	}
	get age(): number {
		return this.#age;
	}

	get transactions(): Transaction[] {
		return this.#transactions;
	}

	public updateUser(data: UpdateUserDTO) {
		this.#name = data.name ?? this.#name;
		this.#email = data.email ?? this.#email;
		this.#age = data.age ?? this.#age;
	}

	public addTransaction(transaction: Transaction) {
		this.#transactions.push(transaction);
	}
}
