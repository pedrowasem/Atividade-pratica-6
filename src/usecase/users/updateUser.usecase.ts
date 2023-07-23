import { UserRepository } from '../../repository/user.repository';
import { CreateUserDTO } from './createUser.usecase';

export type UpdateUserDTO = {
	userIndex: number;
	name?: string;
	email?: string;
	age?: number;
};

type UpdateUserReturn = {
	success: boolean;
	message: string;
	user?: CreateUserDTO;
};

export class UpdateUser {
	constructor(private data: UpdateUserDTO) {
		this.data = data;
	}

	public execute(): UpdateUserReturn {
		const repository = new UserRepository();

		const updatedUser = repository.updateUser(this.data);

		return {
			success: true,
			message: 'User updated successfully',
			user: updatedUser,
		};
	}
}
