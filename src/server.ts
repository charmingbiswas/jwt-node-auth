import express, { Request, Response } from 'express';
import { baseConfiguration } from 'config/baseConfig';
import { connectDB } from 'config/databaseConfig';
import { errorHandlerMiddleware } from 'middlewares/errorHandlerMiddleware';
import mainRouter from 'routes/main.route';

//INITIALIZE VARIABLES
const Server = express();

//REGISTER MIDDLEWARES
Server.use(express.json());
// Server.use(cors);

//REGISTER ROUTES
Server.use(mainRouter);

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
// initServer();

Server.use(errorHandlerMiddleware);

Server.listen(baseConfiguration.SERVER_PORT, () => {
	console.log(`Server started on port ${baseConfiguration.SERVER_PORT}`);
});
