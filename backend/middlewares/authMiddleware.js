import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../models/user.model.js";

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const user = await findUserByEmail(username);
      if (!user) return cb(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? cb(null, user) : cb(null, false, { message: "Incorrect password" });
    } catch (err) {
      return cb(err);
    }
  })
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