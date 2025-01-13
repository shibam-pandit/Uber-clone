import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../models/user.model.js";
import { findCaptainByEmail, findCaptainById } from "../models/captain.model.js";

// Local strategy for users
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, cb) => {
      try {
        const user = await findUserByEmail(email);
        if (!user) return cb(null, false, { message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          user.type = "user"; // Add type for serialization
          return cb(null, user);
        }
        return cb(null, false, { message: "Invalid email or password" });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Local strategy for captains
passport.use(
  "captain-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, cb) => {
      try {
        const captain = await findCaptainByEmail(email);
        if (!captain) return cb(null, false, { message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, captain.password);
        if (isMatch) {
          captain.type = "captain"; // Add type for serialization
          return cb(null, captain);
        }
        return cb(null, false, { message: "Invalid email or password" });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Unified serialization
passport.serializeUser((entity, cb) => {
  cb(null, { id: entity.id, type: entity.type }); // Store both ID and type
});

// Unified deserialization
passport.deserializeUser(async ({ id, type }, cb) => {
  try {
    if (type === "user") {
      const user = await findUserById(id);
      return cb(null, user);
    } else if (type === "captain") {
      const captain = await findCaptainById(id);
      return cb(null, captain);
    }
    cb(new Error("Invalid type during deserialization"));
  } catch (err) {
    cb(err);
  }
});

// Authentication middleware
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === "user") {
    return next();
  }
  res.status(401).json({ error: "User not authenticated. Please log in." });
};

export const isCaptainAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === "captain") {
    return next();
  }
  res.status(401).json({ error: "Captain not authenticated. Please log in." });
};

export default passport;
