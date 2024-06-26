import express from 'express';
import * as authController from '../controllers/authController';
import * as bookingsController from '../controllers/bookingsController';

const router = express.Router();

router.use(authController.protect);
router.get('/', bookingsController.getOurbookings);
router.post('/', bookingsController.createBooking);
router.patch('/:id', bookingsController.updateBooking);
router.delete('/:id', bookingsController.deleteBooking);

export default router;
