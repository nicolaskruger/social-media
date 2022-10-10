import type {ErrorRequestHandler} from 'express';

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
	console.log('midlleware');
	console.log(error);

	return res.status(400).json({
		message: error.message,
	});
};

export {
	errorMiddleware,
};
