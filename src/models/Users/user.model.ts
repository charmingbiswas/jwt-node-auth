import mongoose from 'mongoose';

export interface UserModelInterface {
	username?: string;
	email: string;
	password: string;
	salt: string;
}

const UserSchema = new mongoose.Schema<UserModelInterface>(
	{
		username: {
			type: String,
			required: false,
			default: '',
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		salt: {
			type: String,
			required: true,
			select: false,
		},
	},
	{
		timestamps: true,
	},
);

export const UserModel = mongoose.model('User', UserSchema);
