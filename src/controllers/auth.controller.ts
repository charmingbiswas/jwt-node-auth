import { Request, Response } from 'express';
import UserModerlHelpers from 'models/Users/user.helpers';
import { hashPassword, randomSaltGenerator } from 'utils/index';

const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;

		//If any of the fields are missing
		if (!email || !username || !password)
			return res.status(400).json({
				message: 'Missing data. Please provide all relevant fields!',
			});

		//Check is user email id already exists in the database
		const existingUser = await UserModerlHelpers.getUserByEmail(email);
		if (existingUser)
			return res.status(400).json({ message: 'User already exists!' });

		//If user email does not exist then
		const salt = randomSaltGenerator();
		const newUser = await UserModerlHelpers.createUser({
			email,
			username,
			authorization: {
				salt,
				password: hashPassword(salt, password),
			},
		});

		return res.status(201).json(newUser).end();
	} catch (err) {
		console.error(err);
		return res.status(400);
	}
};

const signin = (req: Request, res: Response) => {};

const signout = (req: Request, res: Response) => {};

export = {
	signup,
	signin,
	signout,
};
