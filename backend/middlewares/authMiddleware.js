import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../models/user.model.js";
import { findCaptainByEmail, findCaptainById } from "../models/captain.model.js";

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, cb) => {
      try {
        const user = await findUserByEmail(email);
        if (!user) return cb(null, false, { message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? cb(null, user) : cb(null, false, { message: "Invalid email or password" });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  "captain-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, cb) => {
      try {
        const captain = await findCaptainByEmail(email);
        if (!captain) return cb(null, false, { message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, captain.password);
        return isMatch ? cb(null, captain) : cb(null, false, { message: "Invalid email or password" });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Serialize captain (for storing captain data in the session)
passport.serializeUser((captain, cb) => {
  cb(null, captain.id); // Store captain ID in the session for "captain-local"
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await findUserById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

// Deserialize captain (for retrieving captain data from the session)
passport.deserializeUser(async (id, cb) => {
  try {
    const captain = await findCaptainById(id);
    cb(null, captain);
  } catch (err) {
    cb(err);
  }
});

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Middleware to ensure authentication (for captains)
export const isCaptainAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/captain-login");
};

export default passport;