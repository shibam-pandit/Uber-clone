import db from "../db/db.js";
import { getDistanceTime, getAddressCordinates } from "./maps.services.js";

export const getFare = async(pickup, destination) => {
    if(!pickup || !destination) {
        throw new Error("Please provide both pickup and destination addresses.");
    }

    const pickup_coords = await getAddressCordinates(pickup);
    const destination_coords = await getAddressCordinates(destination);

    const distanceTime = await getDistanceTime(pickup_coords, destination_coords);
    const { distance, duration } = distanceTime;
    

    // Define fare details for each vehicle type
    const fareRates = {
        auto: {
            baseFare: 20, // Base fare in currency units
            perKm: 10,    // Fare per kilometer
            perMin: 1     // Optional: Fare per minute
        },
        motorcycle: {
            baseFare: 15,
            perKm: 8,
            perMin: 0.8
        },
        car: {
            baseFare: 50,
            perKm: 15,
            perMin: 2
        }
    };

    // Calculate fares for each vehicle type
    const calculateFare = (baseFare, perKm, perMin) => {
        return Math.floor(baseFare + (perKm * distance/1000) + (perMin * duration/60));
    };

    const fares = {
        auto: calculateFare(fareRates.auto.baseFare, fareRates.auto.perKm, fareRates.auto.perMin),
        motorcycle: calculateFare(fareRates.motorcycle.baseFare, fareRates.motorcycle.perKm, fareRates.motorcycle.perMin),
        car: calculateFare(fareRates.car.baseFare, fareRates.car.perKm, fareRates.car.perMin)
    };

    return fares; // Returns an object with calculated fares
}

const generateOTP = (num) => {
    if (num <= 0 || !Number.isInteger(num)) {
        throw new Error("Invalid input: 'num' send to generateOTP must be a positive integer.");
    }
    
    const min = Math.pow(10, num - 1); // Minimum value for num digits
    const max = Math.pow(10, num) - 1; // Maximum value for num digits
    
    return Math.floor(Math.random() * (max - min + 1)) + min; // Generate OTP
};

export const createRide = async (userId, pickup, destination, vehicleType, fare) => {
    if(!userId || !pickup || !destination || !vehicleType) {
        throw new Error("Please provide all required ride details.");
    }

    // Insert ride details into the database
    const ride = await db.query(
        "INSERT INTO ride (userid, pickup, destination, vehicletype, fare, otp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [userId, pickup, destination, vehicleType, fare, generateOTP(6)]
    );

    return ride.rows[0]; // Returns the newly created ride
};

export const confirmRide = async (captainId, rideId) => {
    console.log("Confirming ride for captain", captainId, "ride", rideId);
    
    const result = await db.query(
        "UPDATE ride SET captainid = $1 WHERE id = $2 RETURNING *",
        [captainId, rideId]
    );
    return result.rows[0]; // Return the confirmed ride record
};

export const getRideById = async (rideId) => {
    if(!rideId) {
        throw new Error("Please provide a valid ride ID.");
    }

    // Fetch ride details from the database
    const ride = await db.query("SELECT * FROM ride WHERE id = $1", [rideId]);

    return ride.rows[0]; // Returns the ride details
};

export const statusUpdate = async (rideId, status) => {
    if(!rideId || !status) {
        throw new Error("Please provide both ride ID and status.");
    }

    // Update ride status in the database
    const ride = await db.query(
        "UPDATE ride SET status = $1 WHERE id = $2 RETURNING *",
        [status, rideId]
    );

    return ride.rows[0]; // Returns the updated ride details
}