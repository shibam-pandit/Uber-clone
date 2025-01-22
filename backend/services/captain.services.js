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
export const updateCaptainSocketId = async (id, socketId) => {
    const result = await db.query(
        "UPDATE captains SET socket_id = $1 WHERE id = $2 RETURNING *",
        [socketId, id]
    );
    return result.rows[0]; // Return the updated captain record
};

// Update captain status (active/inactive)
export const updateCaptainStatus = async (id, status) => {
    const result = await db.query(
        "UPDATE captains SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
    );
    return result.rows[0]; // Return the updated captain record
};

// Fetch vehicle details for the captain
export const findVehicleByCaptainId = async (captainId) => {
    const result = await db.query(
        "SELECT * FROM vehicle WHERE captain_id = $1",
        [captainId]
    );
    return result.rows[0]; // Return the vehicle details (if any)
};


// Fetch current location details for the captain
export const findLocationByCaptainId = async (captainId) => {
    const result = await db.query(
        "SELECT latitude, longitude FROM location WHERE captain_id = $1",
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
