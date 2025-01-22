import express from 'express';
import { body } from "express-validator";
import { registerUser, loginUser, logoutUser, getUserProfile } from "../controllers/user.controller.js";
import { Authenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], loginUser);

router.get('/logout', Authenticated, logoutUser);

router.get("/profile", Authenticated, getUserProfile);

export default router;