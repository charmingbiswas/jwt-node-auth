import express from 'express';
import { baseConfiguration } from 'config/baseConfig';
import { connectDB } from 'config/databaseConfig';
import authRouter from 'routes/auth.route';

//INITIALIZE VARIABLES
const Server = express();

//REGISTER MIDDLEWARES
Server.use(express.json());
// Server.use(cors);

//REGISTER ROUTES
Server.use('/api/v1/auth', authRouter);

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
			console.error(err);
			// initServer(); //retry database connection once more
		});
};

//RUN SERVER
initServer();
