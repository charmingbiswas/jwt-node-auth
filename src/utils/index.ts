import { Request, Response, NextFunction, Handler } from 'express';
import crypto from 'node:crypto';
import { baseConfiguration } from 'config/baseConfig';

//Generate random strings for usage as a salt for hashing passwords
export const randomSaltGenerator = () =>
	crypto.randomBytes(128).toString('base64');

//Actual function that uses sha256 algorithm for hashing password
export const hashPassword = (salt: string, password: string) => {
	return crypto
		.createHmac('sha256', [salt, password].join('/'))
		.update(baseConfiguration.HASH_SECRET as string)
		.digest()
		.toString();
};

export class CustomError extends Error {
	public message: string;
	public statusCode: number;
	public status: string;
	public isOperationalError: boolean;
	constructor(message: string, statusCode: number) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperationalError = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export const catchAsyncErrors = (handler: Handler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next);
		} catch (err) {
			return next(err);
		}
	};
};
