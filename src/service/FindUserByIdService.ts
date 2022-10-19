import type {PrismaClient} from '@prisma/client';
import type {Request, Response} from 'express';

export class FindUserByIdService {
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async handle(req: Request, res: Response) {
		const {id} = req.params;

		const user = await this.prisma.user.findFirst({where: {
			id: Number(id),
		}});

		if (!user) {
			return res.status(404)
				.json({
					message: `user with id: ${id} not found`,
				});
		}

		return res.json({
			...user,
		});
	}
}
