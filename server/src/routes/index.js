import express from 'express';
import authRouter from './authRoutes.js';
import hotelsRouter from './hotelsRoutes.js';
import usersRouter from './usersRoutes.js';
import bookingsRouter from './bookingsRoutes.js';
import roomsRouter from './roomsRoutes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/hotels', hotelsRouter);
router.use('/users', usersRouter);
router.use('/bookings', bookingsRouter); // da finire [capire quali proprietà mettere nel bookings table]
router.use('/rooms', roomsRouter); // finito

export default router;
