import type {User} from '@dto/user';

export type UserRepositoryInterface = {
	findUserById(id: number): Promise<User>;
	findUserByEmail(email: string): Promise<User>;
};
