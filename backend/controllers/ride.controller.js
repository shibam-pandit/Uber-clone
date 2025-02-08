import { validationResult } from "express-validator";
import { createRide, getFare } from "../services/ride.services.js";
import { findNearbyCaptains } from "../services/captain.services.js";
import { sendMessageToSocketId } from "../socket.js";
import { getAddressCordinates } from "../services/maps.services.js";

export const RideCreate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType, fare } = req.body;

    try {
        const ride = await createRide(req.user.id, pickup, destination, vehicleType, fare);
    
        res.status(201).json(ride);
        
        (async () => {
            
            try {
                const pickupCordinates = await getAddressCordinates(pickup);
                const nearCaptains = await findNearbyCaptains(pickupCordinates.lat, pickupCordinates.lon);
                
                ride.otp = "";

                nearCaptains.forEach(captain => {
                    sendMessageToSocketId(captain.socket_id, {
                        type: 'ride-requests',
                        payload: {
                            data: ride,
                            distance: Math.round(captain.distance * 100) / 100,
                            user: {
                                firstname: req.user.firstname,
                                lastname: req.user.lastname,
                            }
                        }
                    });
                })
            }
            catch (error) {
                console.log("Error in sending ride requests to captains", error);
            }
        })();  // In JavaScript, declaring an async arrow function like this does nothing until you call it. To invoke it immediately (as an Immediately Invoked Function Expression, or IIFE), you need to add () at the end:

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