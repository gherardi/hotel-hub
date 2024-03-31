import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';

import authRouter from './routes/authRoutes.js';
import albergatoriRouter from './routes/albergatoriRoutes.js';
// import camereRouter from './routes/camereRoutes.js';
import prenotazioniRouter from './routes/prenotazioniRoutes.js';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

dotenv.config();

const app = express();

// IMPLEMENT CORS
app.use(cors());
app.options('*', cors());

// GLOBAL MIDDLEWARES
app.use(morgan('dev')); // Development logging

app.use(express.json()); // Body parser, reading data from body into req.body
app.use(helmet()); // Set security HTTP headers
app.use(cookieParser()); // Parse cookies

// const limiter = rateLimit({
// 	max: 100,
// 	windowMs: 60 * 60 * 1000,
// 	message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter); // Limit requests from same API

// API ROUTING
app.use('/api/auth', authRouter);
app.use('/api/albergatori', albergatoriRouter);
// app.use('/api/camere', camereRouter);
app.use('/api/prenotazioni', prenotazioniRouter);

// app.get('/api/status', (req, res) => {
// 	res.status(200).json({ status: 'success' });
// });

// ERROR HANDLING
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
