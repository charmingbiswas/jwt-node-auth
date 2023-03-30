import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'utils/index';

export const errorHandlerMiddleware = (
	error: CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';
	if (error.isOperationalError) {
		return res.status(error.statusCode).json({
			status: error.status,
			message: error.message,
		});
	} else {
		console.error(`ERROR 💥: ${error}`);

		return res.status(500).json({
			status: 'error',
			message: 'Something went wrong',
		});
	}
};
