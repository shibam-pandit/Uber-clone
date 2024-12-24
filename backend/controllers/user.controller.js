import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { validationResult } from "express-validator";

const saltRounds = 10;

export const registerUser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.send("Email already exists. Try logging in.");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await createUser(firstname, lastname, email, hashedPassword);

      req.login(user, (err) => {
        if (err) console.error(err);
        res.status(201).json({user: user});
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
};
