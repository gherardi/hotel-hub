import express from 'express';
import * as authController from '../controllers/authController.js';
import * as bookingsController from '../controllers/bookingsController.js';

const router = express.Router();

router.use(authController.protect);
router.get('/', bookingsController.getOurbookings);
router.post('/', bookingsController.createBooking);
router.patch('/:id', bookingsController.updateBooking); // da sistemare, creato da copilot
router.delete('/:id', bookingsController.deleteBooking);

// router.use(authController.restrictToAdmin); // da togliere, non so se rimpiazzare con altro
// router.get('/all', prenotazioniController.getAllPrenotazioni);

export default router;
