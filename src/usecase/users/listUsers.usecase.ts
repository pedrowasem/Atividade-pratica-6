import { UserRepository } from '../../repository/user.repository';
import { CreateUserDTO } from './createUser.usecase';

export type ListUsersDTO = {
	name?: string;
	cpf?: string;
	email?: string;
};

type ListUsersReturn = {
	success: boolean;
	message: string;
	users?: CreateUserDTO[];
};

export class ListUsers {
	private data: ListUsersDTO;

	constructor(data: ListUsersDTO) {
		this.data = data;
	}
	public execute(): ListUsersReturn {
		const repository = new UserRepository();
		const listUsersReturn = repository.listUsers(this.data);

		if (!listUsersReturn.length) return { success: false, message: 'No users found' };

		return {
			success: true,
			message: 'Users returned successfully',
			users: listUsersReturn,
		};
	}
}
