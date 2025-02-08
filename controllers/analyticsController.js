import Expense from '../models/expense.js';
import { Sequelize } from 'sequelize';

/**
 * Get expenses with filters, search, and pagination
 */

export const getExpenseStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Monthly Expense Trends
        const monthlyTrends = await Expense.findAll({
            attributes: [
                [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            where: { userId },
            group: ['month'],
            order: [['month', 'ASC']]
        });

        // Top Spending Categories
        const categoryBreakdown = await Expense.findAll({
            attributes: [
                'category',
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            where: { userId },
            group: ['category'],
            order: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'DESC']]
        });

        // Payment Method Breakdown
        const paymentMethodBreakdown = await Expense.findAll({
            attributes: [
                'paymentMethod',
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            where: { userId },
            group: ['paymentMethod']
        });

        res.json({
            monthlyTrends,
            categoryBreakdown,
            paymentMethodBreakdown
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching expense analytics', error: error.message });
    }
};
