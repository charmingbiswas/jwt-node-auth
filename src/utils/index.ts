import { baseConfiguration } from 'config/baseConfig';
import crypto from 'node:crypto';

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
