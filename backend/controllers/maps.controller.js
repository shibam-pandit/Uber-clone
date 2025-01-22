import { validationResult } from "express-validator";
import { getAddressCordinates, getDistanceTime, getSuggestions } from "../services/maps.services.js";

export const getCoordinates = async (req, res, next) => {
    const { address } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    if (!address) {
        return res.status(400).json({ message: "Address is required" });
    }

    try {
        const coordinates = await getAddressCordinates(address);
        res.status(200).json(coordinates);
    }
    catch (error) {
        res.status(404).json({ message: "Error fetching coordinates" });
    }
}

export const getDistanceAndTime = async (req, res, next) => {
    const { origin, destination } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    if (!origin || !destination) {
        return res.status(400).json({ message: "Origin and destination are required" });
    }

    try {
        const originCoordinates = await getAddressCordinates(origin);
        const destinationCoordinates = await getAddressCordinates(destination);

        if (!originCoordinates || !destinationCoordinates) {
            return res.status(404).json({ message: "Error fetching coordinates" });
        }

        const { distance, duration } = await getDistanceTime(originCoordinates, destinationCoordinates);
        res.status(200).json({ distance, duration });
    }
    catch (error) {
        res.status(404).json({ message: "Error fetching distance and time" });
    }  
}

export const getNearbyLocations = async (req, res, next) => {
    const { address } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    if (!address) {
        return res.status(400).json({ message: "Address is required" });
    }

    try {
        // const coordinates = await getAddressCordinates(address);
        const places = await getSuggestions(address);
        res.status(200).json(places);
    }
    catch (error) {
        res.status(404).json({ message: "Error fetching nearby locations suggetions" });
    }
}