import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import apiRouter from './routes';
import ApplicationError from './utils/applicationError';
import globalErrorHandler from './controllers/errorController';

import { env } from './utils/env';

const app = express();
const PORT = Number(env.PORT);

app.use(cors());

if (env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

app.use('/api', apiRouter);

app.all('*', (req, res, next) => {
	next(
		new ApplicationError(`Can't find ${req.originalUrl} on this server!`, 404)
	);
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

console.clear();
