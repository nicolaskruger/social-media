import {Router} from 'express';
import {userRoute} from './User';

const router = Router();

router.use('/user', userRoute);

export {
	router,
};
