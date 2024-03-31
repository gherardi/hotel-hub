import express from 'express';
import * as authController from './../controllers/authController.js';
import * as prenotazioniController from './../controllers/prenotazioniController.js';

const router = express.Router();

router.use(authController.protect);
router.get('/', prenotazioniController.prenotazioni);
// router.post('/', middeleware);

export default router;
