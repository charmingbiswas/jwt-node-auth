import express from 'express';
import authController from 'controllers/auth.controller';

const authRouter = express.Router();

authRouter
	.post('/signup', authController.signup)
	.post('/signin', authController.signin)
	.get('/signout', authController.signout);

export default authRouter;
