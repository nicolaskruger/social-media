import jwt from 'jsonwebtoken';
import type {PrismaClient} from '@prisma/client';
import {hashPassword} from '@utils/hashPassword';
import {compare} from 'bcrypt';
import type {Request, Response} from 'express';
import {env} from 'process';
import type {UserRepositoryInterface} from 'src/repository/UserRepositoryIntervface';

type Login = {
	email: string;
	password: string;
};

export class SignInUserService {
	constructor(private readonly userRePository: UserRepositoryInterface) {
	}

	async handle(req: Request, res: Response) {
		const {email, password} = req.query as Login;

		const _user = await this.userRePository.findUserByEmail(email);

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
