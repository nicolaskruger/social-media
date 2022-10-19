import {prisma} from './prismaSingleton';
import {FindUserByIdService} from '@service/FindUserByIdService';
import {SignInUserService} from '@service/signInUserService';
import {SignUpUserService} from '@service/SignUpUserService';

const signUp = new SignUpUserService(prisma);
const signIn = new SignInUserService(prisma);
const userById = new FindUserByIdService(prisma);

export {
	prisma,
	signUp,
	signIn,
	userById,
};
