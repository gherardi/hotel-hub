import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sendGrid from '@sendgrid/mail';
import path from 'path';
import database from './config/database.js';
import * as url from 'url';
import dotenv from 'dotenv';

import viewRouter from './routes/viewRoutes.js';
import userRouter from './routes/userRoutes.js';
import camereRouter from './routes/camereRoutes.js';
import prenotazioniRouter from './routes/prenotazioniRoutes.js';

dotenv.config({ path: './config.env' });

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

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
	// req.requestTime = new Date().toISOString();
	req.isLoggedIn = !!req.session.user;
	next();
});

// routing
app.use('/', viewRouter);
app.use('/api/users', userRouter);
app.use('/api/camere', camereRouter);
app.use('/api/prenotazioni', prenotazioniRouter);

app.patch('/api/send-email', async (req, res) => {
	const { email } = req.body;
	const resetToken = crypto.randomUUID();

	database.query(
		`UPDATE albergatori SET passwordResetToken = '${resetToken}' WHERE email = '${email}'`,
		async (err, result) => {
			if (err) {
				res.status(500).send({
					status: 'fail',
					message: 'Errore nella query SQL',
					err,
				});
			} else {
				if (result.affectedRows > 0) {
					const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

					const msg = {
						to: email,
						from: 'gherardivictor@gmail.com',
						subject: 'Reset your password here',
						text: 'to reset your password click on the link below',
						html: `<strong>to reset your password click <a href=${resetURL}>here</a></strong>
						<br><br><br>
						if the link doesn't work copy and paste this url in your browser: ${resetURL}
						`,
					};
					await sendGrid.send(msg);
					console.log('Email sent');
					res.status(200).json({
						status: 'success',
						message: 'Email inviata con successo',
					});
				} else {
					// Nessuna riga è stata modificata, quindi l'utente non è stato trovato
					res.status(404).json({
						status: 'fail',
						message: 'Utente non trovato',
					});
				}
			}
		}
	);
});

app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

export default app;
