import express from 'express';
import database from '../config/database.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	database.query(`SELECT * FROM albergatori WHERE email = '${email}'`, async (err, result) => {
		if (err) {
			res.status(500).send({
				status: 'error',
				message: 'Errore nella query SQL',
				err,
			});
		} else {
			if (result.length > 0) {
				const correctPassword = await bcrypt.compare(password, result[0].password);
				if (correctPassword) {
					req.session.user = { nominativo: result[0].nominativo, email, id: result[0].id };
					res.status(201).json({
						status: 'success',
						requestedAt: req.requestTime,
					});
				} else {
					res.status(401).json({
						status: 'error',
						message: 'Password non corretta',
					});
				}
			} else {
				res.status(401).json({
					status: 'error',
					message: 'Credenziali non valide',
				});
			}
		}
	});
});

router.post('/signup', async (req, res) => {
	const { nominativo, email, password } = req.body;
	const hash = await bcrypt.hash(password, 12);

	database.query(
		`INSERT INTO albergatori (nominativo, email, password) VALUES ('${nominativo}', '${email}', '${hash}')`,
		(err, result) => {
			if (err) {
				res.status(500).send({
					status: 'error',
					message: 'Errore nella query SQL',
					err,
				});
			} else {
				req.session.user = { nominativo, email, id: result.insertId };
				res.status(200).json({
					status: 'success',
				});
			}
		}
	);
});

export default router;
