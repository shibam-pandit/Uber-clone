import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
import passport from "passport";
import authController from "./authMiddleware.js";

export default (app) => {
  // Configure session
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Use environment variable for security
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    })
  );

  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
};
