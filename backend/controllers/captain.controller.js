import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import passport from "passport";
import { findCaptainByEmail, createCaptain } from "../models/captain.model.js";

const saltRounds = 10;

export const registerCaptain = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password, color, plate, capacity, vehicleType } = req.body;

  try {
    const existingCaptain = await findCaptainByEmail(email);

    if (existingCaptain) {
      res.send("Email already exists. Try logging in.");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const captain = await createCaptain(firstname, lastname, email, hashedPassword, color, plate, capacity, vehicleType);

      req.login(captain, (err) => {
        if (err) console.error(err);
        res.status(201).json({ captain: captain });
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
};


export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    passport.authenticate("captain-local", (err, captain, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error.");
      }
  
      if (!captain) {
        return res.status(401).send(info.message || "Invalid email or password.");
      }
  
      req.login(captain, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Login failed.");
        }
  
        return res.status(200).json({ captain });
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
}

export const logoutCaptain = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err); // Pass the error to the error-handling middleware
    }
    res.status(200).send("Logged out successfully.");
  });
};

export const getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.user });
};