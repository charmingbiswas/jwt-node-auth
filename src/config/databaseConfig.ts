import mongoose from 'mongoose';
import { baseConfiguration } from './baseConfig';

export const connectDB = (): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			await mongoose.connect(baseConfiguration.MONGO_URI as string);
			console.log('Successfully connected to database');
			resolve();
		} catch (err) {
			console.error(`ERROR OCCURRED: ${err}`);
			reject();
		}
	});
};
