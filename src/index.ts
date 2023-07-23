import express from 'express';
import { TransactionsController, UsersController } from './controllers';

import { verifyCpf } from './middlewares/verifyCpf';
import { verifyCreateTransactionData } from './middlewares/verifyCreateTransactionData';
import { verifyCreateUserData } from './middlewares/verifyCreateUserData';
import { verifyTransaction } from './middlewares/verifyTransaction';
import { verifyTransactionsListFilters } from './middlewares/verifyTransactionsListFilters';
import { verifyUpdateTransactionData } from './middlewares/verifyUpdateTransactionData';
import { verifyUpdateUserData } from './middlewares/verifyUpdateUserData';
import { verifyUserExists } from './middlewares/verifyUserExist';
import { verifyUserId } from './middlewares/verifyUserId';
import { verifyUsersListFilters } from './middlewares/verifyUsersListFilters';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	return res.send('API de Transações');
});

app.listen(7439, () => console.log('listening on port 7439'));

const usersController = new UsersController();

app.post('/users', verifyCreateUserData, verifyCpf, verifyUserExists, usersController.create);

app.get('/users', verifyUsersListFilters, verifyCpf, usersController.listUsers);

app.get('/users/:userId', verifyUserId, usersController.listUser);

app.delete('/users/:userId', verifyUserId, usersController.deleteUser);

app.put('/users/:userId', verifyUpdateUserData, verifyUserId, usersController.updateUser);

const transactionsController = new TransactionsController();

app.post(
	'/users/:userId/transactions',
	verifyCreateTransactionData,
	verifyUserId,
	transactionsController.createTransaction
);

app.get(
	'/users/:userId/transactions',
	verifyTransactionsListFilters,
	verifyUserId,
	transactionsController.listTransactions
);

app.get(
	'/users/:userId/transactions/:id',
	verifyUserId,
	verifyTransaction,
	transactionsController.listTransaction
);

app.put(
	'/users/:userId/transactions/:id',
	verifyUpdateTransactionData,
	verifyUserId,
	verifyTransaction,
	transactionsController.updateTransaction
);

app.delete(
	'/users/:userId/transactions/:id',
	verifyUserId,
	verifyTransaction,
	transactionsController.deleteTransaction
);
