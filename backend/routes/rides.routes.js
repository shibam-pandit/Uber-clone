import express from 'express';
import { body } from 'express-validator';
import { RideCreate } from '../controllers/ride.controller.js';
import { Authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', 
    Authenticate,

    body('pickup').isString().notEmpty().withMessage('Invalid pickup location'),
    body('destination').isString().notEmpty().withMessage('Invalid destination location'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).notEmpty().withMessage('Invalid vehicle type'),

    RideCreate
);

export default router;