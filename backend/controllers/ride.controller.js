import { validationResult } from "express-validator";
import { createRide } from "../services/ride.services.js";
import { getFare } from "../services/ride.services.js";

export const RideCreate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    
    try {
        const ride = await createRide(req.user.id, pickup, destination, vehicleType);
        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFareDetails = async (req, res, next) => {
    const { pickup, destination } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    if (!pickup || !destination) {
        return res.status(400).json({ message: "Pickup and destination are required" });
    }

    try {
        const fares = await getFare(pickup, destination);
        res.status(200).json(fares);
    }
    catch (error) {
        res.status(404).json({ message: "Error fetching fare details" });
    }
};