import { randomUUID } from 'crypto';
import { User } from '../classes/user.class';
import { users } from '../database';
import { ListUsersDTO, UpdateUserDTO } from '../usecase/users';
import { CreateUserDTO } from '../usecase/users/createUser.usecase';

export class UserRepository {
	public createUser(data: CreateUserDTO) {
		const newUser = new User({
			id: randomUUID(),
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			age: data.age,
		});
		users.push(newUser);

		return newUser;
	}

	public listUsers(data: ListUsersDTO) {
		const { name, cpf, email } = data;

		let filteredUsers = users;
		if (name) {
			filteredUsers = filteredUsers.filter((user) => user.name.includes(name as string));
		}
		if (email) {
			filteredUsers = filteredUsers.filter((user) => user.email.includes(email as string));
		}
		if (cpf) {
			filteredUsers = filteredUsers.filter((user) => user.cpf.includes(cpf as string));
		}

		return filteredUsers.map((user) => {
			return {
				id: user.id,
				name: user.name,
				cpf: user.cpf,
				email: user.email,
				age: user.age,
			};
		});
	}

	public getUserById(id: string): number {
		const index = users.findIndex((user) => user.id === id);

		return index;
	}

	public listUser(index: number) {
		const { id, name, cpf, email, age } = users[index];
		return { id, name, cpf, email, age };
	}

	public deleteUser(index: number) {
		const { id, name, cpf, email, age } = users.splice(index, 1)[0];
		return { id, name, cpf, email, age };
	}

	public updateUser(data: UpdateUserDTO) {
		users[data.userIndex].updateUser(data);
		const { id, name, cpf, email, age } = users[data.userIndex];
		return { id, name, cpf, email, age };
	}
}
