import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateName, validateEmail, validatePassword } from '../middlewares/validateInput.js';

const router = express.Router();

router.post('/signup', validateName, validateEmail, validatePassword, authController.signup);
router.post('/login', validateEmail, validatePassword, authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', validateEmail, authController.forgotPassword);
router.patch('/resetPassword/:token', validatePassword, authController.resetPassword);

export default router;
