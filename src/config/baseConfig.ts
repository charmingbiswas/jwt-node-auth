import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const baseConfiguration = {
	NODE_ENV: process.env.NODE_ENV,
	SERVER_PORT: process.env.SERVER_PORT,
	MONGO_URI: process.env.MONGO_URI,
};
