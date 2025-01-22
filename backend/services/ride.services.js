import db from "../db/db.js";
import { getDistanceTime } from "./maps.services.js";

const getFare = async(pickup, destination) => {
    if(!pickup || !destination) {
        throw new Error("Please provide both pickup and destination addresses.");
    }

    const distanceTime = await getDistanceTime(pickup, destination);
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
        return baseFare + (perKm * distance) + (perMin * duration);
    };

    const fares = {
        auto: calculateFare(fareRates.auto.baseFare, fareRates.auto.perKm, fareRates.auto.perMin),
        motorcycle: calculateFare(fareRates.motorcycle.baseFare, fareRates.motorcycle.perKm, fareRates.motorcycle.perMin),
        car: calculateFare(fareRates.car.baseFare, fareRates.car.perKm, fareRates.car.perMin)
    };

    return fares; // Returns an object with calculated fares
}