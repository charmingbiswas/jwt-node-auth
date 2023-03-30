import { NextFunction, Request, Response } from 'express';
import UserModerlHelpers from 'models/Users/user.helpers';
import {
	catchAsyncErrors,
	CustomError,
	hashPassword,
	randomSaltGenerator,
} from 'utils/index';

const signup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		//If any of the fields are missing
		if (!email || !password)
			return next(
				new CustomError(
					'Missing data, please provide all required fields',
					400,
				),
			);

		//Check is user email id already exists in the database
		const existingUser = await UserModerlHelpers.getUserByEmail(email);
		if (existingUser)
			return next(new CustomError('User already exists!', 401));

		//If user email does not exist then
		const salt = randomSaltGenerator();
		const newUser = await UserModerlHelpers.createUser({
			email,
			authorization: {
				salt,
				password: hashPassword(salt, password),
			},
		});

		return res.status(201).json(newUser).end();
	},
);

const signin = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		return next(new CustomError('BOOM', 401));
	},
);

const signout = (req: Request, res: Response) => {};

export = {
	signup,
	signin,
	signout,
};
