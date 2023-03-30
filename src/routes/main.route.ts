import express from 'express';
import authRouter from 'routes/auth.route';
import { baseAPIs } from 'api/baseAPIs';

const mainRouter = express.Router();
mainRouter.use(baseAPIs.AUTH, authRouter);

export default mainRouter;
