import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

// Create a new Pool instance
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // required for SSL connection
    sslmode: "require",
  }
});

// Check the connection
const connectToDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");  // This query returns the current timestamp from the database
    console.log("Database connected successfully:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

// Call the check function when the app starts
export { connectToDB };

// Export pool to be used elsewhere
export default pool;
