import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { validationResult } from "express-validator";
import passport from "passport";

const saltRounds = 10;

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
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await createUser(firstname, lastname, email, hashedPassword);

      req.login(user, (err) => {
        if (err) console.error(err);
        res.status(201).json({ user: { firstname, lastname, email } });
      });
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

  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error.");
      }
  
      if (!user) {
        return res.status(401).json({ errors: [{ msg: info.message || "Invalid email or password." }] });
      }
  
      req.login(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ errors: [{ msg: "Server error." }] });
        }

        const firstname = user.firstname;
        const lastname = user.lastname;
        const email = user.email;
  
        return res.status(200).json({ user: { firstname, lastname, email } });
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: [{ msg: "Server error." }] });
  }
}

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ errors: [{ msg: "Logout failed" }] });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ errors: [{ msg: "Logout failed" }] });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(200).send("Logged out successfully.");
    });
  });
};

export const getUserProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};