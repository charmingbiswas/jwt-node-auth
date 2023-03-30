import mongoose from 'mongoose';

export interface UserModelInterface {
	email: string;
	authorization: {
		password: string;
		salt: string;
		sessionToken?: string;
	};
}

const UserSchema = new mongoose.Schema<UserModelInterface>(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		authorization: {
			password: {
				type: String,
				required: true,
				select: false,
			},
			salt: {
				type: String,
				select: false,
			},
			sessionToken: {
				type: String,
				select: false,
			},
		},
	},
	{
		timestamps: true,
	},
);

export const UserModel = mongoose.model('User', UserSchema);
