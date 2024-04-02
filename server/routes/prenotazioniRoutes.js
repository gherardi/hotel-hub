import express from 'express';
import * as authController from './../controllers/authController.js';
import * as prenotazioniController from './../controllers/prenotazioniController.js';

const router = express.Router();

router.use(authController.protect);
router.get('/', prenotazioniController.prenotazioni);
router.post('/', prenotazioniController.creaPrenotazione);

router
	.route('/:id')
	.delete(prenotazioniController.deleteBooking);

router.use(authController.restrictToAdmin);
router.get('/all', prenotazioniController.getAllPrenotazioni);

export default router;
