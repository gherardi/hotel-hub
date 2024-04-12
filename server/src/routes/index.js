import express from 'express';
import authRouter from './authRoutes.js';
import hotelsRouter from './hotelsRoutes.js';
// import usersRouter from './usersRoutes.js';
// import bookingsRouter from './bookingsRoutes.js';
// import roomsRouter from './roomsRoutes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/hotels', hotelsRouter);
// router.use('/users', usersRouter);
// router.use('/bookings', bookingsRouter);
// router.use('/rooms', roomsRouter);

export default router;
