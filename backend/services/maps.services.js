import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

export const getAddressCordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url);
        const data = await response.data;

        if (data.length === 0) {
            throw new Error("No results found");
        }

        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

export const getDistanceTime = async (origin, destination) => {

    if(!origin || !destination) {
        throw new Error("Please provide both origin and destination coordinates.");
    }

    const apiKey = process.env.OPENROUTESERVICE_API_KEY;
    const baseUrl = "https://api.openrouteservice.org/v2/directions/driving-car";

    const params = {
        api_key: apiKey,
        start: `${origin.lon},${origin.lat}`, // Origin coordinates (lon,lat)
        end: `${destination.lon},${destination.lat}`, // Destination coordinates (lon,lat)
    };

    try {
        const response = await axios.get(baseUrl, { params });
        const data = response.data;

        // Extract distance (in meters) and duration (in seconds)
        const distance = data.features[0].properties.segments[0].distance; // in meters
        const duration = data.features[0].properties.segments[0].duration; // in seconds

        return {
            distance, // e.g., 12345 meters
            duration, // e.g., 678 seconds
        };
    } catch (error) {
        console.error("Error fetching distance and time:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch distance and time.");
    }
}

export const getSuggestions = async (address) => {
    try {
        // Step 1: Get the coordinates of the given address
        const coordinates = await getAddressCordinates(address);

        if (!coordinates) {
            throw new Error("Failed to fetch coordinates for the given address.");
        }

        const { lat, lon } = coordinates;

        // Step 2: Build the Overpass API query
        const overpassUrl = "https://overpass-api.de/api/interpreter";
        const overpassQuery = `
            [out:json];
            (
                node["amenity"](around:1000, ${lat}, ${lon});
                way["amenity"](around:1000, ${lat}, ${lon});
                relation["amenity"](around:1000, ${lat}, ${lon});
            );
            out center;
        `;

        // Step 3: Fetch nearby locations using Overpass API
        const response = await axios.post(overpassUrl, overpassQuery, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const data = response.data;

        if (!data.elements || data.elements.length === 0) {
            return [];
        }

        // Step 4: Extract and format the results
        const nearbyLocations = data.elements
            .filter((element) => element.tags && element.tags.name) // Only include locations with a name
            .slice(0, 5) // Limit to 5 results
            .map((element) => ({
                name: element.tags.name,
                type: element.tags.amenity,
                lat: element.lat || element.center?.lat,
                lon: element.lon || element.center?.lon,
            }));

        return nearbyLocations;
    } catch (error) {
        console.error("Error fetching nearby locations:", error.response ? error.response.data : error.message);
        return [];
    }
};