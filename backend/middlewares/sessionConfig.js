import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
import passport from "passport";
import authController from "./authMiddleware.js";

export default (app) => {
  // Configure session
  app.use(
    session({
      name: "connect.sid", // Name of the cookie
      secret: process.env.SESSION_SECRET, // Use environment variable for security
      resave: false,
      saveUninitialized: true,
      cookie: { 
        maxAge: 1000 * 60 * 60 * 24 , // 24 hours
        httpOnly: true,    // Prevent JavaScript access to cookies
        secure: false,      // does not Ensure cookies are sent only over HTTPS
        sameSite: "none"
      }, 
    })
  );

  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
};
