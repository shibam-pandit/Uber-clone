import express from 'express';
import {body} from "express-validator";
import { CaptainAuthenticate } from '../middlewares/authMiddleware.js';
import { loginCaptain, logoutCaptain, registerCaptain, getCaptainProfile } from '../controllers/captain.controller.js';

const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("firstname").isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body("color").isLength({min: 3}).withMessage("Color must be at least 3 characters long"),
    body("plate").isLength({min: 3}).withMessage("Plate must be at least 3 characters long"),
    body("capacity").isInt().withMessage("Capacity must be a number"),
    body("vehicleType").isIn(['car', 'motorcycle', 'auto']).withMessage("Vehicle type must be either car, motorcycle, or auto"),
], 
    registerCaptain
);

router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
], 
    loginCaptain
);

router.get("/logout", CaptainAuthenticate, logoutCaptain);

router.get("/profile", CaptainAuthenticate, getCaptainProfile);

export default router;