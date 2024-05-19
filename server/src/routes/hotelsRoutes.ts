import express from 'express';
import * as authController from '../controllers/authController';
import * as hotelsController from '../controllers/hotelsController';

const router = express.Router();

router.get('/', hotelsController.getAllHotels);

router.use(authController.protect);
router.use(authController.restrictToAdmin);
router.get('/:id', hotelsController.getHotel);
router.post('/', hotelsController.createHotel);
router.patch('/:id', hotelsController.updateHotel);
router.delete('/:id', hotelsController.deleteHotel);

export default router;
