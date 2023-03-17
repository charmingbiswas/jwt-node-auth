import express from 'express';
import { baseConfiguration } from './config/baseConfig';
import { connectDB } from './config/databaseConfig';

//INITIALIZE VARIABLES
const Server = express();

//REGISTER MIDDLEWARES
Server.use(express.json());

//REGISTER ROUTES
Server.use('/api/v1/auth');

//INITIALIZE SERVER
const initServer = () => {
	connectDB()
		.then(() => {
			Server.listen(baseConfiguration.SERVER_PORT, () => {
				console.log(
					`Server started on port ${baseConfiguration.SERVER_PORT}`,
				);
			});
		})
		.catch((err) => {
			initServer();
		});
};

//RUN SERVER
initServer();
