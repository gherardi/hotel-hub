import express from 'express';
import * as authController from '../controllers/authController.js';
import * as v from '../middlewares/validation.js';

const router = express.Router();

router.post('/signup', v.name, v.email, v.password, authController.signup);
router.post('/login', v.email, v.password, authController.login);
router.post('/forgotPassword', v.email, authController.forgotPassword);
router.patch('/resetPassword/:token', v.password, authController.resetPassword);
router.get('/logout', authController.logout);

export default router;
