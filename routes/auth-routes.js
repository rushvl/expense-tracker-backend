import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import error from "jsonwebtoken/lib/JsonWebTokenError.js";
import {loginUser, registerUser} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;