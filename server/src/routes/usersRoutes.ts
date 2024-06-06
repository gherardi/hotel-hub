import express from 'express';
import * as authController from '../controllers/authController';
import * as usersController from '../controllers/usersController';
// import * as validator from '../middlewares/validator';

const router = express.Router();

// router.get('/existing-emails/:email', usersController.existingEmails);

router.use(authController.protect);
router.get('/me', usersController.getMe);
router.patch('/me', usersController.updateMe);
router.get('/dashboard', usersController.dashboard);

router.use(authController.restrictToAdmin);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.post('/:id', usersController.createUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;
