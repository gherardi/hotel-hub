import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import limiter from './utils/limiter.js';
import apiRouter from './routes/index.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// IMPLEMENT CORS
app.use(cors());
// app.options('*', cors());

// GLOBAL MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use('/api', limiter);

// ROUTES
app.use('/api', apiRouter);
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
	console.log(`server running on PORT http://localhost:${PORT}`);
});

console.clear();
