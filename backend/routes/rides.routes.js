import express from 'express';
import { body, query } from 'express-validator';
import { RideCreate, getFareDetails } from '../controllers/ride.controller.js';
import { Authenticate } from '../middlewares/authMiddleware.js';

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

export default router;