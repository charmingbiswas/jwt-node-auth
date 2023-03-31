import { baseConfiguration } from 'config/baseConfig';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModelHelpers from 'models/Users/user.helpers';
import {
	catchAsyncErrors,
	CustomError,
	hashPassword,
	randomSaltGenerator,
} from 'utils/index';

const signup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, username } = req.body;

		//If any of the fields are missing
		if (!email || !password)
			return next(
				new CustomError(
					'Missing data, please provide all required fields',
					400,
				),
			);

		//Check is user email id already exists in the database
		const existingUser = await UserModelHelpers.getUserByEmail(email);
		if (existingUser)
			return next(new CustomError('User already exists!', 401));

		//If user email does not exist then
		const salt = randomSaltGenerator();
		await UserModelHelpers.createUser({
			username,
			email,
			salt,
			password: await hashPassword(salt, password),
		});

		return res
			.status(201)
			.json({
				status: 'success',
				message: 'User successfully created',
			})
			.end();
	},
);

const signin = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		if (!email || !password)
			return next(
				new CustomError(
					'Missing data, please provide email and password',
					400,
				),
			);

		const existingUser = await UserModelHelpers.getUserByEmail(email);

		if (existingUser) {
			const hashedPassword = await hashPassword(
				existingUser.salt,
				password,
			);

			//Meaning passowrd is correct
			if (hashedPassword === existingUser.password) {
				const token = jwt.sign(
					{
						id: existingUser._id,
					},
					baseConfiguration.JWT_SECRET as string,
					{
						expiresIn: baseConfiguration.JWT_EXPIRY_TIME,
					},
				);
				return res.status(200).json({
					status: 'success',
					token,
				});
			} else {
				return next(
					new CustomError('Entered password is incorrect', 400),
				);
			}
		} else return next(new CustomError('No such email id exists', 400));
	},
);

const signout = (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.sess)
};

const authController = {
	signin,
	signout,
	signup,
};

export default authController;
