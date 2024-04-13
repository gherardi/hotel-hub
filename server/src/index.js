import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import apiRouter from './routes/index.js';
import ApplicationError from './utils/applicationError.js';
import globalErrorHandler from './controllers/errorController.js';
import { rateLimitOptions } from './utils/consts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// IMPLEMENT CORS
app.use(cors());

// GLOBAL MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use('/api', rateLimit(rateLimitOptions));

// ROUTES
app.use('/api', apiRouter);

app.all('*', (req, res, next) => {
	next(
		new ApplicationError(`Can't find ${req.originalUrl} on this server!`, 404)
	);
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

// APP LISTENING
const server = app.listen(PORT, () => {
	console.log(`server running on PORT http://localhost:${PORT}`);
});

console.clear();
