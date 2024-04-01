import express from 'express';
import * as albergatoriController from '../controllers/albergatoriController.js';
import * as authController from '../controllers/authController.js';

import { validateName, validateEmail, validatePassword } from '../middlewares/validateInput.js';

const router = express.Router();

// router.get('/existing-emails/:email', albergatoriController.existingEmails);

router.use(authController.protect);
router.get('/me', albergatoriController.getMe);
router.patch(
	'/updateMe',
	validateName,
	validateEmail,
	validatePassword,
	albergatoriController.updateMe
);

router.get('/dashboard', albergatoriController.dashboard);

// restricted access to only admin
router.use(authController.restrictToAdmin);

router.get('/', albergatoriController.getAllUsers);
router.get('/hotels', albergatoriController.getAllHotels);

router
	.route('/:id')
	.get(albergatoriController.getUser)
	// 	// .patch(albergatoriController.updateUser)
	.delete(albergatoriController.deleteUser);

export default router;
