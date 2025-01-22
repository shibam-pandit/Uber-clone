import express from 'express';
import { query } from 'express-validator';
import { Authenticated } from '../middlewares/authMiddleware.js';
import { getCoordinates, getDistanceAndTime, getNearbyLocations } from '../controllers/maps.controller.js';

const router = express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}).withMessage('Address is required of minimum length 3 characters'),
    getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}).withMessage('Origin is required of minimum length 3 characters'),
    query('destination').isString().isLength({min:3}).withMessage('Destination is required of minimum length 3 characters'),
    getDistanceAndTime
);

router.get('/get-suggetions',
    query('address').isString().isLength({min:3}).withMessage('Address is required of minimum length 3 characters'),
    getNearbyLocations
);

export default router;