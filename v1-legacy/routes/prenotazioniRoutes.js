import express from 'express';
import database from '../config/database.js';
import { differenzaInGiorni } from '../utils/helper.js';

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

router.post('/', (req, res) => {
	const { nominativo, email, camera, checkin, checkout } = req.body;
	const giorni = differenzaInGiorni(checkin, checkout);

	let prezzo_totale = 0;
	database.query(`SELECT prezzo_giornaliero, sconto FROM camere WHERE id = ${camera}`, (err, result) => {
		if (err) {
			res.status(500).send({
				status: 'error',
				message: 'Errore nella query SQL',
				err,
			});
		} else {
			prezzo_totale = result[0].prezzo_giornaliero * giorni;
			prezzo_totale = prezzo_totale - (prezzo_totale * result[0].sconto) / 100;
			database.query(
				`INSERT INTO prenotazioni
				(nominativo_cliente, email_cliente, data_check_in, data_check_out, prezzo_totale, data_creazione_prenotazione, id_camera, id_albergatore)
				VALUES ('${nominativo}', '${email}', '${checkin}', '${checkout}', '${prezzo_totale}', '${new Date().toLocaleDateString()}', '${Number(
					camera
				)}', '${req.session.user.id}')`,
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
		}
	});
});

router.delete('/:id', (req, res) => {
	database.query(`DELETE FROM prenotazioni WHERE id = ${req.params.id}`, (err, result) => {
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
