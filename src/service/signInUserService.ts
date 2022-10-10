import jwt from 'jsonwebtoken';
import type {PrismaClient} from '@prisma/client';
import {hashPassword} from '@utils/hashPassword';
import {compare} from 'bcrypt';
import type {Request, Response} from 'express';
import {env} from 'process';

type Login = {
	email: string;
	password: string;
};

export class SignInUserService {
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async handle(req: Request, res: Response) {
		const {email, password} = req.query as Login;

		const _user = await this.prisma.user.findFirst(
			{
				where: {
					email,
				},
			},
		);

		if (!_user) {
			return res.status(400).json({
				message: 'user does not exist',
			});
		}

		if (await compare(password, _user.password)) {
			return res.status(400).json({
				message: 'password does not match',
			});
		}

		const hash = env.HASH || '';

		return res.json({
			token: jwt.sign({email: _user.email}, hash),
		});
	}
}
