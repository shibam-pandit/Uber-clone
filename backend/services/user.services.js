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
