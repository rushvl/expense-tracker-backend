import express from 'express';
import {authenticateToken} from "../middleware/authenticateToken.js";
import Expense from "../models/expense.js";
import {createExpense, deleteExpense, getExpense, updateExpense} from "../controllers/expenseController.js";

const router = express.Router();

router.post('/expenses', authenticateToken, createExpense);
router.get('/expenses', authenticateToken, getExpense);
router.put('/expenses/:id', authenticateToken, updateExpense);
router.delete('/expenses/:id', authenticateToken, deleteExpense);

export default router;