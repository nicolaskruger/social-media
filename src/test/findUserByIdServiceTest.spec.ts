import {FindUserByIdService} from '../service/FindUserByIdService';
import type {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import type {UserRepositoryInterface} from '../repository/UserRepositoryIntervface';
import type {User} from '@dto/user';
jest.mock('../repository/UserRepositoryIntervface');

const repository = jest.createMockFromModule<UserRepositoryInterface>('../repository/UserRepositoryIntervface');
const req = jest.createMockFromModule<Request>('express');
const res = jest.createMockFromModule<Response>('express');

type Message = {
	message: string;
};

type Query = {
	where: {
		id: number;
	};
};

describe('find user tests', () => {
	it('user not found', async () => {
		req.params = {
			id: '1',
		};

		const finUserById = jest.fn(_ => null);
		repository.findUserById = finUserById;

		const status = jest.fn(_ => res);
		res.status = status;

		const json = jest.fn(_ => res);
		res.json = json;

		const service = new FindUserByIdService(repository);
		await service.handle(req, res);

		const statusNumber = status.mock.calls[0][0] as number;

		expect(statusNumber).toBe(
			404,
		);

		const jsonResult = json.mock.calls[0][0] as Message;

		expect(jsonResult).toEqual({
			message: 'user with id: 1 not found',
		});

		const userId = finUserById.mock.calls[0][0] as Query;

		expect(userId).toEqual(1);
	});
	it('user found', async () => {
		const user: User = {
			email: 'nicolas@email.com',
			id: 1,
			image: 'url',
			name: 'nicolas',
			password: '123',
		};

		req.params = {
			id: '1',
		};

		const finUserById = jest.fn(async _ => new Promise<User>(res => {
			res(user);
		}));
		repository.findUserById = finUserById;

		const json = jest.fn(_ => res);
		res.json = json;

		const service = new FindUserByIdService(repository);
		await service.handle(req, res);

		const jsonResult = json.mock.calls[0][0] as Message;

		expect(jsonResult).toEqual({
			email: 'nicolas@email.com',
			id: 1,
			image: 'url',
			name: 'nicolas',
			password: '123',
		});
	});
});
