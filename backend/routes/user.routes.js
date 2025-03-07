import express from 'express';
import { body } from "express-validator";
import { registerUser, loginUser, logoutUser, getUserProfile, getPastRides } from "../controllers/user.controller.js";
import { Authenticate } from '../middlewares/authMiddleware.js';

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

router.get('/logout', Authenticate, logoutUser);

router.get("/profile", Authenticate, getUserProfile);

router.get("/past-rides", Authenticate, getPastRides);

export default router;