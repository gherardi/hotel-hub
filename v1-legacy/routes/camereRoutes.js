import express from 'express';
import database from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
	database.query(
		`
		SELECT camere.*
		FROM camere
		INNER JOIN albergatori ON camere.id_albergatore = albergatori.id
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
					data: { camere: rows },
				});
			}
		}
	);
});

router.post('/', (req, res) => {
	const { tipologia, numero, prezzo_giornaliero, sconto } = req.body;

	database.query(
		`INSERT INTO camere
		(tipologia, numero, prezzo_giornaliero, occupata, sconto, id_albergatore)
		VALUES ('${tipologia}', '${numero}', '${prezzo_giornaliero}', 0,'${sconto}', '${req.session.user.id}')`,
		(err, result) => {
			if (err) {
				res.status(500).send({
					status: 'error',
					message: 'Errore nella query SQL',
					err,
				});
			} else {
				res.status(200).json({ status: 'success' });
			}
		}
	);
});

router.delete('/:id', (req, res) => {
	database.query(`DELETE FROM camere WHERE id = ${req.params.id}`, (err, result) => {
		if (err) {
			res.status(500).send({
				status: 'error',
				message: 'Errore nella query SQL',
				err,
			});
		} else {
			res.status(200).json({ status: 'success' });
		}
	});
});

export default router;
