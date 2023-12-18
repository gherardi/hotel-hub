import express from 'express';
import database from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
	database.query(
	`
		SELECT prenotazioni.*
		FROM prenotazioni
		INNER JOIN albergatori ON prenotazioni.id_albergatore = albergatori.id
		WHERE albergatori.email = '${req.session.user.email}';
	`,
		(err, rows, fields) => {
			if (err) {
				res.status(500).json({
					status: 'error',
					message: err,
				});
			} else {
				res.status(200).json({
					status: 'success',
					data: { prenotazioni: rows },
				});
			}
		}
	);
});

export default router;
