import db from "../db/db.js";

// Find a captain by email
export const findCaptainByEmail = async (email) => {
    const result = await db.query("SELECT * FROM captains WHERE email = $1", [email]);
    return result.rows[0]; // Return the first matching row
};

// Create a new captain
export const createCaptain = async (firstname, lastname, email, hashedPassword, color, plate, capacity, vehicleType) => {
    if (!firstname || !lastname || !email || !hashedPassword || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }

    const result = await db.query(
        "INSERT INTO captains (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstname, lastname, email, hashedPassword]
    );

    // Create a vehicle record for the captain
    await db.query(
        "INSERT INTO vehicles (captain_id, color, plate, capacity, vehicle_type) VALUES ($1, $2, $3, $4, $5)",
        [result.rows[0].id, color, plate, capacity, vehicleType]
    );

    return result.rows[0]; // Return the created captain record
};

// Find a captain by ID
export const findCaptainById = async (id) => {
    const result = await db.query("SELECT * FROM captains WHERE id = $1", [id]);
    return result.rows[0]; // Return the captain matching the ID
};

// Update a captain's socket_id
export const updateCaptainSocketId = async (email, socketId) => {
    const result = await db.query(
        "UPDATE captains SET socket_id = $1 WHERE email = $2 RETURNING *",
        [socketId, email]
    );
    return result.rows[0]; // Return the updated captain record
};

// Fetch vehicle details for the captain
export const findVehicleByCaptainId = async (captainId) => {
    const result = await db.query(
        "SELECT * FROM vehicles WHERE captain_id = $1",
        [captainId]
    );
    return result.rows[0]; // Return the vehicle details (if any)
};

// Fetch current location details for the captain
export const findLocationByCaptainId = async (captainId) => {
    const result = await db.query(
        "SELECT lat, lon FROM location WHERE captain_id = $1",
        [captainId]
    );
    return result.rows[0]; // Return the location details (if any)
};

// Fetch captain along with their vehicle and location details
export const findCaptainByEmailWithDetails = async (email) => {
    // Step 1: Fetch captain data
    const captainResult = await db.query(
        "SELECT * FROM captains WHERE email = $1",
        [email]
    );
    
    const captain = captainResult.rows[0]; // Get captain data
    
    if (!captain) {
        throw new Error("Captain not found");
    }

    // Step 2: Fetch vehicle details
    const vehicle = await findVehicleByCaptainId(captain.id);

    // Step 3: Fetch location details
    const location = await findLocationByCaptainId(captain.id);

    // Return captain along with vehicle and location details
    return {
        ...captain, // Spread captain details
        vehicle,    // Attach vehicle details
        location    // Attach location details
    };
};

export const updateCaptainLocation = async(id, lat, lon) => {
    const result = await db.query(
        `INSERT INTO captain_locations (captain_id, lat, lon)
       VALUES ($1, $2, $3)
       ON CONFLICT (captain_id) DO UPDATE 
       SET lat = EXCLUDED.lat, lon = EXCLUDED.lon`,     // EXCLUDED is a special table that stores values from the row that would have been inserted if there were no conflict.
      [id, lat, lon]
    );
    return result.rows[0]; // Return the updated location record
};

export const deleteCaptainLocation = async(id) => {
    await db.query("DELETE FROM captain_locations WHERE captain_id = $1", [id]);
};

export const findNearbyCaptains = async (lat, lon, radius = 10) => {
    // Haversine Formula to find nearby captains
    const query = `
        SELECT * FROM (
            SELECT cl.captain_id, cl.lat, cl.lon, c.socket_id,
                   (6371 * acos(cos(radians($1)) * cos(radians(cl.lat)) *
                   cos(radians(cl.lon) - radians($2)) + sin(radians($1)) *
                   sin(radians(cl.lat)))) AS distance
            FROM captain_locations cl 
            JOIN captains c ON cl.captain_id = c.id
        ) AS subquery
        WHERE distance < $3
        ORDER BY distance ASC;
    `;

    const result = await db.query(query, [lat, lon, radius]);
    return result.rows; // Returns list of nearby captains
};

export const pastRides = async (captainId) => {
    const result = await db.query(
        "SELECT * FROM ride WHERE captainid = $1",
        [captainId]
    );
    return result.rows; 
};