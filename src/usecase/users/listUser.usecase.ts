import { UserRepository } from '../../repository/user.repository';
import { CreateUserDTO } from './createUser.usecase';
type ListUsersReturn = {
	success: boolean;
	message: string;
	user: CreateUserDTO;
};
export class ListUser {
	constructor(private index: number) {
		this.index = index;
	}

	public execute(): ListUsersReturn {
		const repository = new UserRepository();

		return { success: true, message: 'User returned', user: repository.listUser(this.index) };
	}
}
