import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail, addUser } from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await addUser(name, email, hashedPassword);

    res.status(201).json({ message: "User registered", user: { name: newUser.name, email: newUser.email, isAdmin: newUser.is_admin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const jwtToken = jwt.sign(
      { email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ jwtToken, user: { name: user.name, email: user.email, isAdmin: user.is_admin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    let user = await getUserByEmail(email);
    if (!user) {
      user = await addUser(name, email, null);
    }

    const jwtToken = jwt.sign(
      { email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ jwtToken, user: { name: user.name, email: user.email, isAdmin: user.is_admin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};