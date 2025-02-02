import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import User from '../models/user.js';

const router = express.Router();

export default router;