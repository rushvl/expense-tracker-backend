import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import Expense from "../models/expense.js";

const router = express.Router();

export default router;