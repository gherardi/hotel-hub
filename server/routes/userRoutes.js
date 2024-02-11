import express from 'express';
import * as authController from './../controllers/authController.js';
import { validateName, validateEmail, validatePassword } from '../middlewares/validateInput.js';

const router = express.Router();

// ! use axios with baseURL and call it API
// ! if(!res.ok) per chiamate api

router.post('/signup', validateName, validateEmail, validatePassword, authController.signup);
router.post('/login', validateEmail, validatePassword, authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.get('/existing-emails/:email', authController.existingEmails);

export default router;
