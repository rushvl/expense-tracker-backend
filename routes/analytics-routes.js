import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getExpenseStats } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/', authenticateToken, getExpenseStats);

export default router;
