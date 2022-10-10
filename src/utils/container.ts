import {PrismaClient} from '@prisma/client';
import {SignInUserService} from '@service/signInUserService';
import {SignUpUserService} from 'src/service/SignUpUserService';

const prisma = new PrismaClient();
const signUp = new SignUpUserService(prisma);
const signIn = new SignInUserService(prisma);

export {
	prisma,
	signUp,
	signIn,
};
