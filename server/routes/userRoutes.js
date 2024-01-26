import express from 'express';
import * as authController from './../controllers/authController.js';

const router = express.Router();

// ! use axios with baseURL and call it API
// ! if(!res.ok) per chiamate api

router.post('/signup', authController.validateSignupInput, authController.signup);
router.post('/login', authController.validateLoginInput, authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.get('/existing-emails/:email', authController.existingEmails);

export default router;
