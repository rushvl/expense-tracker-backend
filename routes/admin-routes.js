import express from 'express';
import {isAdmin} from "../middleware/checkAdmin.js";
import {authenticateToken} from "../middleware/authenticateToken.js";
import {deleteUser, getAnalytics, getUser, updateUser} from "../controllers/adminController.js";

const router = express.Router();

/*
* Manage Users
* */
router.get('/users', authenticateToken, isAdmin, getUser);
router.patch('/users/:userId', authenticateToken, isAdmin, updateUser);
router.delete('/users/:userId', authenticateToken, isAdmin, deleteUser);

/*
* Get user analytics
* */

router.get('/analytics', authenticateToken, isAdmin, getAnalytics);

export default router;