import { Request, Response } from 'express';
import {
	CreateUserUseCase,
	DeleteUser,
	ListUser,
	ListUsers,
	UpdateUser,
} from '../../usecase/users';

export class UsersController {
	public create(req: Request, res: Response) {
		const { name, cpf, email, age } = req.body;

		const usecase = new CreateUserUseCase({
			name,
			email,
			age,
			cpf,
		});

		const response = usecase.execute();

		return res.status(201).json(response);
	}

	public listUsers(req: Request, res: Response) {
		const { name, cpf, email } = req.body;
		const usecase = new ListUsers({ name, cpf, email });

		const response = usecase.execute();

		if (!response.success) res.status(400).json(response);

		return res.status(200).json(response);
	}

	public listUser(req: Request, res: Response) {
		const { userIndex } = req.body;
		const usecase = new ListUser(userIndex);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(404).json(response);
		}
		return res.status(200).json(response);
	}

	public deleteUser(req: Request, res: Response) {
		const { userIndex } = req.body;
		const usecase = new DeleteUser(userIndex);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(404).json(response);
		}
		return res.status(200).json(response);
	}

	public updateUser(req: Request, res: Response) {
		const data = req.body;
		const usecase = new UpdateUser(data);

		const response = usecase.execute();

		if (!response.success) {
			return res.status(404).json(response);
		}
		return res.status(200).json(response);
	}
}
