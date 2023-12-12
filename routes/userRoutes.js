import express from 'express';
import database from '../config/database.js';

const router = express.Router();

const registerUser = function (req, res) {
	const { email, password } = req.body;
	db.query(
		'INSERT INTO users (email, password) VALUES (?, ?)',
		[email, password],
		(err, result) => {
			if (err) {
				res.status(500).send({
					status: 'error',
					message: 'Errore nella query SQL',
					err,
				});
			} else {
				res.status(201).json({
					status: 'success',
					requestedAt: req.requestTime,
					data: {
						user: result,
					},
				});
			}
		}
	);
};

const loginUser = function (req, res) {
	const { email, password } = req.body;

	database.query(
		`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
		(err, result) => {
			if (err) {
				res.status(500).send({
					status: 'error',
					message: 'Errore nella query SQL',
				});
			} else {
				if (result.length > 0) {
					req.session.user = result[0];

					// res.redirect('/home');
					res.status(200).json({
						status: 'success',
						message: 'Login effettuato con successo',
						requestedAt: req.requestTime,
						data: {
							user: result,
						},
					});
				} else {
					res.status(401).json({
						status: 'error',
						message: 'Credenziali non valide',
					});
				}
			}
		}
	);
};

router.post('/login', (req, res) => {
	const { email, password } = req.body;
  req.session.user = { email, password };
	res.status(200).json({
		status: 'success',
		email,
		password,
	});
});

router.post('/signup', (req, res) => {
	console.log(req);
});

export default router;
