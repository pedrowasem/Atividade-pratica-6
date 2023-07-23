import { UserRepository } from '../../repository/user.repository';
import { CreateUserDTO } from './createUser.usecase';

type DeleteUserReturn = {
	success: boolean;
	message: string;
	user?: CreateUserDTO;
};

export class DeleteUser {
	constructor(private index: number) {
		this.index = index;
	}

	public execute(): DeleteUserReturn {
		const repository = new UserRepository();

		return {
			success: true,
			message: 'User deleted successfully',
			user: repository.deleteUser(this.index),
		};
	}
}
