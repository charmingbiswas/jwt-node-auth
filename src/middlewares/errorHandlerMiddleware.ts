import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	return res.send(400).send(error.message);
};
