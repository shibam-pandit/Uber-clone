import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
// import passport from "passport";
import passport from "./authMiddleware.js";

export default (app) => {
  // Configure session
  app.use(
    session({
      name: "connect.sid", // Name of the cookie
      secret: process.env.SESSION_SECRET, // Use environment variable for security
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,    // Prevent JavaScript access to cookies
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
      },
    })
  );

  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
};
