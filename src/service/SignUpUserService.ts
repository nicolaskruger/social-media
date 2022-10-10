import type {User} from '@dto/user';
import type {NextFunction, Request, Response} from 'express';
import type {PrismaClient} from '@prisma/client';
import {hashPassword} from 'src/utils/hashPassword';

export class SignUpUserService {
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async handle(req: Request, res: Response, next: NextFunction) {
		const user = req.body as User;
		const password = await hashPassword(user.password);

		const emailAlreadRegister = await this.prisma.user.findFirst(
			{
				where: {
					email: user.email,
				},
			},
		);

		if (emailAlreadRegister) {
			return res.status(400).json({
				message: 'email alread register',
			});
		}

		await this.prisma.user.create({
			data: {
				email: user.email,
				name: user.name,
				password,
			},
		});
		return res.json({
			...user,
		});
	}
}
