import express from 'express';
import {authenticateToken} from "../middleware/authenticateToken.js";
import {createExpense, deleteExpense, getExpense, updateExpense} from "../controllers/expenseController.js";

const router = express.Router();

router.post('/', authenticateToken, createExpense);
router.get('/', authenticateToken, getExpense);
router.put('/:id', authenticateToken, updateExpense);
router.delete('/:id', authenticateToken, deleteExpense);

export default router;