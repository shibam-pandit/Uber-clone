import db from "../db/db.js";

export const findUserByEmail = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

export const createUser = async (firstname, lastname, email, hashedPassword) => {

    if (!firstname || !lastname || !email || !hashedPassword) {
        throw new Error("All fields are required");
    }

    const result = await db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstname, lastname, email, hashedPassword]
    );
    return result.rows[0];
};

export const findUserById = async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

// Update a user's socket_id
export const updateUserSocketId = async (email, socketId) => {
    const result = await db.query(
        "UPDATE users SET socket_id = $1 WHERE email = $2 RETURNING *",
        [socketId, email]
    );
    return result.rows[0]; // Return the updated captain record
};

export const getUserSocketId = async (id) => {
    const result = await db.query("SELECT socket_id FROM users WHERE id = $1", [id]);
    return result.rows[0];
};