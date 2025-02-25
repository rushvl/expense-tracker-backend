import Expense from "../models/expense.js";
import { Op } from "sequelize";

/*
* CRUD Operations for creating entries
* */
export const createExpense = async (req, res) => {
    const { amount, description, category, paymentMethod, userId } = req.body;

    try {
        const expense = await Expense.create({
            amount,
            description,
            category,
            paymentMethod,
            userId
        })
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({message: "Failed to add expense ", error: error.message});
    }
}

// export const getExpense = async (req, res) => {
//     const id = req.user.id;
//     try {
//         const expenses = await Expense.findAll({where: {userId: id}});
//         res.status(201).json(expenses);
//     } catch(error) {
//         res.status(500).json({success:false, message: 'Unable to list expenses', error: error.message});
//     }
// }

export const updateExpense = async (req, res) => {
    const { amount, description, category, paymentMethod, date } = req.body;

    try {
        const expense = await Expense.findOne({ where: { id:req.params.id }});
        if (!expense) {
            res.status(404).json({error: 'Expense not found'});
        }

        expense.amount = amount !== undefined ? amount : expense.amount;
        expense.description = description !== undefined ? description : expense.description;
        expense.category = category !== undefined ? category : expense.category;
        expense.paymentMethod = paymentMethod !== undefined ? paymentMethod : expense.paymentMethod;
        expense.date = date !== undefined ? date : expense.date;

        await expense.save();

        res.status(201).json({message: 'Expense updated successfully'});
    } catch (e) {
        res.status(500).json({message: 'Unable to update expense ', error: e});
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({ where: { id:req.params.id }});

        if (!expense) {
            res.status(404).json({error: 'Expense not found'});
        }

        await expense.destroy();
        res.status(201).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete expense', error: err.message });
    }
}

export const getExpense = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            paymentMethod,
            startDate,
            endDate,
            search,
            sortBy = 'date',
            order = 'DESC'
        } = req.query;

        const offset = (page - 1) * limit;

        const whereClause = {};

        // Filtering by category
        if (category) {
            whereClause.category = category;
        }

        // Filtering by payment method
        if (paymentMethod) {
            whereClause.paymentMethod = paymentMethod;
        }

        // Filtering by date range
        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        // Search by description
        if (search) {
            whereClause.description = { [Op.iLike]: `%${search}%` };
        }

        // Fetch expenses with filtering, sorting, and pagination
        const expenses = await Expense.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortBy, order]], // Sorting dynamically
        });

        res.json({
            totalItems: expenses.count,
            totalPages: Math.ceil(expenses.count / limit),
            currentPage: parseInt(page),
            expenses: expenses.rows,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
