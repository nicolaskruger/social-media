import type {PrismaClient} from '@prisma/client';
import type {Request, Response} from 'express';
import type {UserRepositoryInterface} from 'src/repository/UserRepositoryIntervface';

export class FindUserByIdService {
	constructor(private readonly userRepository: UserRepositoryInterface) {
	}

	async handle(req: Request, res: Response) {
		const {id} = req.params;

		const user = await this.userRepository.findUserById(Number(id));

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
