import {PrismaClient} from '@prisma/client';
import {FindUserByIdService} from '@service/FindUserByIdService';
import {SignInUserService} from '@service/signInUserService';
import {SignUpUserService} from 'src/service/SignUpUserService';

const prisma = new PrismaClient();
const signUp = new SignUpUserService(prisma);
const signIn = new SignInUserService(prisma);
const userById = new FindUserByIdService(prisma);

export {
	prisma,
	signUp,
	signIn,
	userById,
};
