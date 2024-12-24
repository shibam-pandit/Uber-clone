import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../models/user.model.js";

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

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await findUserById(id);
    cb(null, user);
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

export default passport;