import express from 'express';
import authRouter from './authRoutes';
import hotelsRouter from './hotelsRoutes';
import usersRouter from './usersRoutes';
import bookingsRouter from './bookingsRoutes';
import roomsRouter from './roomsRoutes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/hotels', hotelsRouter);
router.use('/users', usersRouter);
router.use('/bookings', bookingsRouter);
router.use('/rooms', roomsRouter);

export default router;
