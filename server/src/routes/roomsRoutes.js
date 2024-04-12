import express from 'express';
import * as authController from '../controllers/authController.js';
import * as roomsController from '../controllers/roomsController.js';

const router = express.Router();

router.use(authController.protect);
router.get('/', roomsController.getOurRooms);
router.post('/', roomsController.createRoom);
router.patch('/:id', roomsController.updateRoom);
router.delete('/:id', roomsController.deleteRoom);

export default router;
