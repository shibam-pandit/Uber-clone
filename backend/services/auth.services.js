import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from "../db/db.js";

dotenv.config();

// Function to generate JWT Token
export const generateAuthToken = (user) => {
    const payload = { _id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

// Function to hash password before saving it
const salt = 10;
export const hashPassword = async (password) => {
    return bcrypt.hash(password, salt);
};

// Function to compare passwords
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


export const blackListingToken = async (token) => {
    await db.query("INSERT INTO blacklisted_tokens (token) VALUES ($1)", [token]);
}

export const isBlackListed = async (token) => {
    const result = await db.query("SELECT * FROM blacklisted_tokens WHERE token = $1", [token]);
    return result.rows.length > 0;
}