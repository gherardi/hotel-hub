import express from 'express';
import * as albergatoriController from '../controllers/albergatoriController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/existing-emails/:email', albergatoriController.existingEmails);

//
router.use(authController.protect);
router.get('/me', albergatoriController.getMe);

//
router.use(authController.restrictToAdmin);
router.get('/', albergatoriController.getAllUsers);

router
	.route('/:id')
	.get(albergatoriController.getUser)
// 	// .patch(albergatoriController.updateUser)
	.delete(albergatoriController.deleteUser);

export default router;
