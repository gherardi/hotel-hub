import express from 'express';
import * as authController from './../controllers/authController.js';
import * as camereController from './../controllers/camereController.js';

const router = express.Router();

router.use(authController.protect);

router.get('/', camereController.getMyRooms);
router.post('/', camereController.createRoom);

router.use(authController.restrictToAdmin);

router.get('/all', camereController.getAllRooms);

router
	.route('/:id')
	.delete(camereController.deleteRoom);

export default router;
