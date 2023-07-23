import { User } from '../../classes/user.class';
import { UserRepository } from '../../repository/user.repository';

export type CreateUserDTO = {
	name: string;
	cpf: string;
	email: string;
	age: number;
};

type CreateReturn = {
	success: boolean;
	message: string;
	createdUser: User;
};

export class CreateUserUseCase {
	private data: CreateUserDTO;

	constructor(data: CreateUserDTO) {
		this.data = data;
	}

	public execute(): CreateReturn {
		const newUser = new UserRepository().createUser(this.data);
		return {
			success: true,
			message: 'User created successfully',
			createdUser: newUser,
		};
	}
}
