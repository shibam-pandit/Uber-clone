import { validationResult } from "express-validator";
import { generateAuthToken, comparePassword, hashPassword, blackListingToken } from "../services/auth.services.js";
import { findCaptainByEmail, createCaptain } from "../services/captain.services.js";

export const registerCaptain = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password, color, plate, capacity, vehicleType } = req.body;

  try {
    const existingCaptain = await findCaptainByEmail(email);

    if (existingCaptain) {
      res.status(400).json({ errors: [{ msg: "Captain account already exists. Try logging in" }] });
    } else {
      const hashedPassword = await hashPassword(password);
      const captain = await createCaptain(firstname, lastname, email, hashedPassword, color, plate, capacity, vehicleType);

      const token = generateAuthToken(captain);

      res.cookie("token", token, {
        httpOnly: true,                  // Ensures the cookie can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production",  // Secure cookie only in production (HTTPS)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // Necessary for cross-site cookies (for frontend-backend communication)
        maxAge: 86400000    // 1 day expiry time
      });

      res.status(201).json({ token, captain: { firstname, email } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server error." }] });
  }
};


export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await findCaptainByEmail(email);
    if (!captain) {
      return res.status(401).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const isMatch = await comparePassword(password, captain.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const token = generateAuthToken(captain);

    res.cookie("token", token, {
      httpOnly: true,                  // Ensures the cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === "production",  // Secure cookie only in production (HTTPS)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // Necessary for cross-site cookies (for frontend-backend communication)
      maxAge: 86400000    // 1 day expiry time
    });

    res.status(200).json({ token, captain: { firstname: captain.firstname, email: captain.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server error." }] });
  }
}

export const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(400).json({ errors: [{ msg: "You are not logged in." }] });
  }

  await blackListingToken(token);

  res.status(200).json({ msg: "Logged out successfully." });
};

export const getCaptainProfile = async (req, res) => {
  const { password, ...captainWithoutPassword } = req.captain; // Destructure to exclude the password
  res.status(200).json({ user: captainWithoutPassword });
};