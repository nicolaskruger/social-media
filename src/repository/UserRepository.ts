import type {User} from '@dto/user';
import type {PrismaClient} from '@prisma/client';
import type {UserRepositoryInterface} from './UserRepositoryIntervface';

export class UserRepository implements UserRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: {
				email,
			},
		});

		return user;
	}

	async findUserById(id: number) {
		const user = await this.prisma.user.findFirst({
			where: {
				id,
			},
		});
		return user;
	}
}
