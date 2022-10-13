import {Router} from 'express';
import {signIn, signUp, userById} from 'src/utils/container';

const userRoute = Router();

userRoute.post('/', async (req, res, next) => signUp.handle(req, res, next));
userRoute.get('/', async (req, res) => signIn.handle(req, res));
userRoute.get('/byId/:id', async (req, res) => userById.handle(req, res));

export {
	userRoute,
};
