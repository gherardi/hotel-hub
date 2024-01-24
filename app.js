import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import userRouter from './routes/userRoutes.js';
// import camereRouter from './routes/camereRoutes';
// import prenotazioniRouter from './routes/prenotazioniRoutes';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import supabase from './utils/supabase.js';

dotenv.config();

const app = express();

// IMPLEMENT CORS
app.use(cors());
app.options('*', cors());

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')); // Development logging
}
app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body
app.use(helmet()); // Set security HTTP headers
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter); // Limit requests from same API

// API ROUTING
app.use('/api/users', userRouter);
// app.use('/api/users', 'camereRouter');
// app.use('/api/camere', 'camereRouter');
// app.use('/api/prenotazioni', 'prenotazioniRouter');

// ERROR HANDLING
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
