import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import User from '../models/user.js';
import Expense from "../models/expense.js";

const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {
    const { amount, description, category, paymentMethod, userId } = req.body;

    try {
        const expense = await Expense.create({
            amount,
            description,
            category,
            paymentMethod,
            userId
        })
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).json({message: "Failed to add expense ", error: error.message});
    }
})

export default router;