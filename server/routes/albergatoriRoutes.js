import express from 'express';
import * as albergatoriController from '../controllers/albergatoriController.js';

const router = express.Router();

router.get('/existing-emails/:email', albergatoriController.existingEmails);

export default router;
