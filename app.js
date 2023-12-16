import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as url from 'url';
// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' });

import viewRouter from './routes/viewRoutes.js';
import userRouter from './routes/userRoutes.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.options('*', cors());

// global middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// routing
app.use('/', viewRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

export default app;
