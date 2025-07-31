import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userAuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);    
AuthRouter.post('/logout', logoutUser);

export { AuthRouter };