import dotenv from "dotenv";
dotenv.config();
import { hashPassword, comparePassword, generateAuthToken, blackListingToken } from "../services/auth.services.js";
import { createUser, findUserByEmail, pastRides } from "../services/user.services.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: "Email already exists. Try logging in." }] });
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await createUser(firstname, lastname, email, hashedPassword);

      const token = generateAuthToken(user);

      res.cookie("token", token, {
        httpOnly: true,                  // Ensures the cookie can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production",  // Secure cookie only in production (HTTPS)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // Necessary for cross-site cookies (for frontend-backend communication)
        maxAge: 86400000    // 1 day expiry time
      });

      res.json({ token, user: { firstname, email } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
};


export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const token = generateAuthToken(user);

    res.cookie("token", token, {
      httpOnly: true,                  // Ensures the cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === "production",  // Secure cookie only in production (HTTPS)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // Necessary for cross-site cookies (for frontend-backend communication)
      maxAge: 86400000    // 1 day expiry time
    });

    return res.json({ token, user: { firstname: user.firstname, email: user.email } });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: [{ msg: "Server error." }] });
  }
}

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(400).json({ errors: [{ msg: "You are not logged in." }] });
  }

  await blackListingToken(token);

  res.status(200).json({ msg: "Logged out successfully." });
};

export const getUserProfile = async (req, res) => {
  const { password, ...userWithoutPassword } = req.user; // Destructure to exclude the password
  res.status(200).json({ user: userWithoutPassword });
};

export const getPastRides = async (req, res) => {
  try {
    const rides = await pastRides(req.user.id);
    res.status(200).json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
}