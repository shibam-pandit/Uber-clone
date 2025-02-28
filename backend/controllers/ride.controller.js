import { validationResult } from "express-validator";
import { createRide, getFare, getRideById, statusUpdate, confirmRide } from "../services/ride.services.js";
import { findNearbyCaptains, findVehicleByCaptainId } from "../services/captain.services.js";
import { sendMessageToSocketId } from "../socket.js";
import { getAddressCordinates } from "../services/maps.services.js";
import { getUserSocketId } from "../services/user.services.js";

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

export const getRide = async (req, res) => {
    const rideId = req.query.rideId;
    if (!rideId) {
        return res.status(400).json({ message: "Ride ID is required" });
    }

    try {
        // Fetch ride details from database
        const ride = await getRideById(rideId);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }
        ride.otp = ""; // Remove OTP before sending to client

        res.status(200).json(ride);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const confirmRideController = async (req, res) => {
    const { rideId, userId, distance } = req.body;
    if (!rideId) {
        return res.status(400).json({ message: "user Id of the ride is required" });
    }
    const captainId = req.captain.id;

    try {
        const ride = await confirmRide(captainId, rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        statusUpdate(rideId, "ongoing");

        res.status(200).json(ride);

        (async () => {
            try {
                const user_socket_id = await getUserSocketId(userId);
                if (!user_socket_id) {
                    console.log("⚠️ No active socket found for user ID:", userId);
                }
                const captain_vehicle = await findVehicleByCaptainId(captainId);

                sendMessageToSocketId(user_socket_id.socket_id, {
                    type: "ride-confirmed",
                    payload: {
                        captain: {
                            firstname: req.captain.firstname,
                            lastname: req.captain.lastname
                        },
                        vehicle: {
                            color: captain_vehicle.color,
                            plate: captain_vehicle.plate,
                            capacity: captain_vehicle.capacity,
                            vehicleType: captain_vehicle.vehicle_type
                        },
                        distance: distance,
                        otp: ride.otp,
                        rideId: ride.id
                    }
                });
            } catch (error) {
                console.log("Error in sending ride requests to captains", error);
            }
        })();

    } catch (error) {
        console.error("Error confirming ride:", error);
        res.status(500).json({ message: "Error confirming ride" });
    }
}

export const checkOTPController = async (req, res) => {
    const { rideId, otp } = req.body;

    try {
        const ride = await getRideById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if (ride.otp != otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        const user_socket_id = await getUserSocketId(ride.userid);

        sendMessageToSocketId(user_socket_id.socket_id, {
            type: 'otp-verified',
            payload: {
                rideId: rideId
            }
        });

        res.status(200).json({ message: "OTP verified" });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const endRideController = async (req, res) => {
    const { rideId } = req.body;

    try {
        const ride = await getRideById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if (ride.status !== "ongoing") {
            return res.status(400).json({ message: "Ride is not ongoing" });
        }

        if (ride.captainid !== req.captain.id) {
            return res.status(401).json({ message: "Request from wrong captain" });
        }

        statusUpdate(rideId, "completed");

        const user_socket_id = await getUserSocketId(ride.userid);

        sendMessageToSocketId(user_socket_id.socket_id, {
            type: 'ride-ended',
            payload: {
                rideId: rideId
            }
        });

        res.status(200).json({ message: "Ride ended" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};