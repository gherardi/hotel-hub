import express from 'express';
import * as authController from '../controllers/authController';
import * as validator from '../middlewares/validator';

const router = express.Router();

router.post('/signup', validator.name, validator.password, authController.signup);
router.post('/login', validator.email, validator.password, authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', validator.email, authController.forgotPassword);
router.patch('/resetPassword/:token', validator.password, authController.resetPassword);

export default router;
