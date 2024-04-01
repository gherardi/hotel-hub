import express from 'express';
import * as authController from './../controllers/authController.js';
import * as camereController from './../controllers/camereController.js';

const router = express.Router();

router.use(authController.protect);

// router.post('/', middeleware);

router.use(authController.restrictToAdmin);

router.get('/all', camereController.getAllRooms);

export default router;
