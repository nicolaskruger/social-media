import {FindUserByIdService} from '../service/FindUserByIdService';
import type {Request, Response} from 'express';
import {prismaMock} from './prismaMock.spec';
import {prisma} from '../utils/prismaSingleton';
const req = jest.createMockFromModule<Request>('express');
const res = jest.createMockFromModule<Response>('express');

type Message = {
	message: string;
};

describe('find user tests', () => {
	it('user not found', async () => {
		req.params = {
			id: '1',
		};

		prismaMock.user.findFirst.mockResolvedValue(null);

		const status = jest.fn(_ => res);
		res.status = status;

		const json = jest.fn(_ => res);
		res.json = json;

		const service = new FindUserByIdService(prisma);
		await service.handle(req, res);

		const statusNumber = status.mock.calls[0][0] as number;

		expect(statusNumber).toBe(
			404,
		);

		const jsonResult = json.mock.calls[0][0] as Message;

		expect(jsonResult).toEqual({
			message: 'user with id: 1 not found',
		});
	});
});
