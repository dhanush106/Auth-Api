import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


const app = express();
//middleware
app.use(express.json({"limit":"16kb"})); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Middleware to parse cookies

//import routes
import { AuthRouter } from './routes/user.routes.js';

//routes
app.get('/', (req, res) => {
    res.send('Welcome to the Auth API');
});

app.use('/api/auth', AuthRouter);


export {app};