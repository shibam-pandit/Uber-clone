import express from 'express';
import { body, query } from 'express-validator';
import { RideCreate, getFareDetails, confirmRideController, getRide, checkOTPController, endRideController } from '../controllers/ride.controller.js';
import { Authenticate, CaptainAuthenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', 
    Authenticate,

    body('pickup').isString().notEmpty().withMessage('Invalid pickup location'),
    body('destination').isString().notEmpty().withMessage('Invalid destination location'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).notEmpty().withMessage('Invalid vehicle type'),
    body('fare').isNumeric().notEmpty().withMessage('Invalid fare amount'),

    RideCreate
);

router.get('/get-fares',
    Authenticate,

    query('pickup').isString().isLength({min:3}).withMessage('Pickup address is required of minimum length 3 characters'),
    query('destination').isString().isLength({min:3}).withMessage('Destination address is required of minimum length 3 characters'),

    getFareDetails
);

router.get("/get-ride", getRide);

router.post('/confirm-ride', CaptainAuthenticate, confirmRideController);

router.post("/check-otp", CaptainAuthenticate, checkOTPController);

router.post("/end-ride", CaptainAuthenticate, endRideController);

export default router;